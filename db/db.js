import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const uri = process.env.URI;

const connectDB = async () => {
  try {
    console.log("DB connected successfully...")
    await mongoose.connect(uri);
  } catch (err) {
    console.error("Mongo DB connection failded", err);
    process.exit(1); // Exit process with failure 
  }
}

export default connectDB;
