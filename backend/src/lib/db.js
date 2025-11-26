import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Fixed: Changed MONG0_URI to MONGO_URI (zero to letter O)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message);
    process.exit(1); // 1 means failure
  }
};