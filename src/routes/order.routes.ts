import { Router } from "express";
import { verify } from "../services/verifyService";
import { add_order, update_order } from "../controllers/order.controller";

const router = Router();

// MAKE AN ORDER
router.route("/").post(verify, add_order);

// UPDATE ORDER
router.route("/").put(verify, update_order);

export default router;