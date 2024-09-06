/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from "express";
import authRoute from "./auth.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.status(200).json({
    message: "spring foods ecommerce server started and running ok!",
    success: true,
    data: { info: "This is test data for spring foods health server" },
  }),
);

/** mount all user authenication routes */
router.use("/api/auth", authRoute);

/** mount all user authenication routes */
// router.use("/api/auth", authRoute);

export default router;
