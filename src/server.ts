import { PORT } from "./constants/conn";
import { connectDB } from "./config/db";
import express, { Application, json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

dotenv.config();

if (!PORT) {
  process.exit(1);
}

connectDB();

const application: Application = express();

application.use(cors({ credentials: true }));
application.use(json());
application.get("/health-check", (req, res) => {
  res.status(200).json({
    message: "Test GET request successful!",
    success: true,
    data: { info: "This is test data" },
  });
  console.log(colors.cyan("Spring Foods ECommerce Server Started and Running."));
});
application.listen(PORT, () => {
  console.log(
    colors.bgBlue(`Spring Foods Web service is running on port ${PORT}`)
  );
});