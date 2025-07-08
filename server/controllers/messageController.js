import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import {io, userSocketMap} from "../server.js";



//  get alll user except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: userId }}).select
            ("-password");

        // count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const message = await Message.find({
                senderId: user._id, //up
                 receiverId: userId,
                  seen: false
            })
            if (message.length > 0) {

                unseenMessages[user._id] = message.length;
            }
        })
        await Promise.all(promises); // up
        res.json({ success: true, users: filteredUsers, unseenMessages })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//  get all message for selected user

export const getMessages = async (req, res)=>{
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages= await Message.find({
            $or:[
                {senderId: myId, receiverId:selectedUserId},
                {senderId: selectedUserId, receiverId:myId},

            ]
        })
        await Message.updateMany({senderId:selectedUserId,
             receiverId:myId}, 
            {seen: true});

            res.json({success:true, messages})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//  api to marks message as seen using message id

export const markMessageAsSeen= async (req, res)=>{
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})
        res.json({success:true})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// send message to selecet user
export const sendMessage = async (req, res)=>{
    try {
        const {text, image} = req.body;
        const receiverId= req.params.id;
        const senderId = req.user._id;
        
        let imageurl;
        if(image){
          const uploadResponse = await cloudinary.uploader.upload(image)
          imageurl = uploadResponse.secure_url;
        }

        const newMessage =await Message.create({
            senderId,
            receiverId,
            text,
            image:imageurl
        })

        // emit the new mwssage to the receviver socket
        const receiverSocketId = userSocketMap[receiverId];
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }


res.json({success:true, newMessage});

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}