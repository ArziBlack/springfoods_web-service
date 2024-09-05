import mongoose from "mongoose";
import { MONGO_URI } from "../constants/conn";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
