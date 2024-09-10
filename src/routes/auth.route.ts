import { Router } from "express";
import {
  signin_customer,
  signup_customer,
  verify_email,
} from "../controllers/auth.controller";

const router = Router();

// CUSTOMER SIGNUP
router.route("/signup").post(signup_customer);

// CUSTOMER SIGNIN
router.route("/signin").post(signin_customer);

// CUSTOMER EMAIL VERIFICATION
router.route("/verify/:email/:token").get(verify_email);

// REFRESH LOGIN

// FORGOT PASSWORD

// VERIFY PASSWORD RESET

export default router;