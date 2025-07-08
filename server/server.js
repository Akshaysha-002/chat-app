import express from "express";
import "dotenv/config";
import cors from "cors";
 import http from "http"
import { connectDB } from "./lib/db.js";
import useRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
//  create express app and HTTP server
const app= express();
const server = http.createServer(app)

// initialize socket.io server
export const io = new Server(server,{
    cors:{origin: "*"}
})

// store online users
export const userSocketMap={}; //{userid:socketid}

// socket.io connecttion handler
io.on("connection",(socket)=>{
    const userId= socket.handshake.query.userId;
    console.log("user connected", userId);

    if(userId) userSocketMap[userId]= socket.id; // up now
    // emit online users to all connected cliet
     io.emit("getOnlineUsers",Object.keys(userSocketMap));
     
     socket.on("disconnect",()=>{
        console.log("User Disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
     })

})

// middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());


// Routes setup
app.use("/api/status",(req, res)=>res.send("Server is live"));
app.use("/api/auth",  useRouter);
app.use("/api/messages", messageRouter);

// connect to mogodb

await connectDB();
if (process.env.NODE_ENV !== "production"){
    const PORT =process.env.PORT || 5000;
    server.listen(PORT,()=> console.log("Server is running on PORT:" + PORT));
}

//  exprect server fro versel

export default server;
