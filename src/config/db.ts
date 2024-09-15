import mongoose from "mongoose";
import { MONGO_PROD_URI, MONGO_URI } from "../constants/conn";
import { bgMagenta } from "colors";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_PROD_URI);
    console.log(bgMagenta(`MongoDB Server up and running at ${MONGO_URI}`));
    console.log(bgMagenta(`MongoDB Server up and running at ${MONGO_PROD_URI}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
