import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
  console.log();
  try {
    await mongoose.connect(db);
    console.log("mongodb connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
