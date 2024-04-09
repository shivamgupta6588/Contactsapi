import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const main = async () => {
  const url = process.env.MONGO_URI;
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default main;
