import { errorHandler } from "./middleware/errorHandler";
import express, { Application, json } from "express";
import { NODE_ENV, PORT } from "./constants/conn";
import { connectDB } from "./config/db";
import routes from "./routes/index";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

dotenv.config();

if (!PORT) {
  process.exit(1);
}

connectDB();

const application: Application = express();

if (NODE_ENV === "development") {
  application.use(morgan("dev"));
} else {
  application.use(morgan("combined"));
}

application.use(cors({ credentials: true }));
application.use(json());
application.use(errorHandler);
application.use("/v1", routes);
application.listen(PORT, () => {
  console.log(
    colors.bgBlue.underline(
      `Spring Foods Web service is running on port ${PORT}`,
    ),
  );
});
