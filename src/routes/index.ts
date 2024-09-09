/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import categoryRoute from "./category.route";
import productRoute from "./product.route";

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

/** mount all admin authenication routes */
router.use("/api/lovette/admin", adminRoute);

/** mount all protected categories routes */
router.use("/api/user", categoryRoute);

/** mount all protected products routes */
router.use("/api/products", productRoute);

export default router;
