import mongoose from "mongoose";

//  function to connect to the mongodb database
export const connectDB = async ()=>{
  try {

    mongoose.connection.on('connected', ()=> console.log('Database Connected'));

    // await mongoose.connect(`${process.env.MONGODB_URL}up/chat-app`) // 
    await mongoose.connect(process.env.MONGODB_URL, {
      
    });
  } catch (error) {
    console.log(error);
  }
};






























// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// // function to connect with mongodb database
// export const connectDB= async () =>{

// try {

//     mongoose.connection.on('connected',()=> 
//         console.log('Database Connected')) ;
//     { // await mongoose.connect//(`//$(process.env.MONGODB_URL)/ chat-app`,{

//     await mongoose.connect(process.env.MONGODB_URL, chat-app,{
//         useNewUrlParser: true, //up
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");

// } catch (error) {
//     console.log("mongoDb connection error", error)
//  }
// };

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// // Function to connect to MongoDB
// export const connectDB = async () => {
//   try {
//     mongoose.connection.on('connected', () =>
//       console.log('✅ Database Connected')
//     );

//     await mongoose.connect(process.env.MONGODB_URL, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });

//     console.log("✅ MongoDB Connected");

//   } catch (error) {
//     console.log("❌ MongoDB connection error:", error);
//   }
// };
