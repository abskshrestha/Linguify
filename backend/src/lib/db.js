import mongoose from "mongoose";

export const connectDB = async () => {
  try{
    const conn = await mongoose.connect(process.env.MONG0_URI);
    console.log(`MongoDB Connecte: ${conn.connection.host}`)

  }
  catch(error){
    console.log('Error in connecting to MongoDB');
    process.exit(1); //1 means failure

  }
}