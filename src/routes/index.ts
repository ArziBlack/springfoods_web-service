/**************************************************************************************** *
 * ******************************                    ************************************ *
 * ******************************   ALL APP ROUTES   ************************************ *
 * ******************************                    ************************************ *
 * ************************************************************************************** */

import { Request, Response, Router } from "express";
import authRoute from "./auth.routes";
import adminRoute from "./admin.routes";
import categoryRoute from "./category.routes";
import productRoute from "./product.routes";
import cartRoute from "./cart.routes";
import orderRoute from "./order.routes";
import reviewRoute from "./review.routes";
import paymentRoute from "./payment.routes";

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
router.use("/api/category", categoryRoute);

/** mount all protected products routes */
router.use("/api/products", productRoute);

/** mount all protected cart routes */
router.use("/api/cart", cartRoute);

/** mount all protected order routes */
router.use("/api/order", orderRoute);

/** mount all protected review routes */
router.use("/api/review", reviewRoute);

/** mount all protected payment routes */
router.use("/api/payment", paymentRoute);

export default router;
