import { Router } from "express";
import { verify } from "../services/verifyService";
import { verify_payment } from "../controllers/transaction.controller";

const router = Router();

// VERIFY PAYMENT FOR PAYSTACK
router.route("/verify-paystack").get(verify, verify_payment);

export default router;