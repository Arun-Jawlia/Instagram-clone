import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; // Get the connection string
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("MONGODB connection FAILED", error);
    throw error; // Rethrow error for handling in server.js
  }
};

export default connectDatabase;
