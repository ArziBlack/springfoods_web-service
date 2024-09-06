import { Router } from "express";
import {
  signin_customer,
  signup_customer,
} from "../controllers/auth.controller";

const router = Router();

// CUSTOMER SIGNUP
router.route("/signup").post(signup_customer);

// CUSTOMER SIGNIN
router.route("/signin").post(signin_customer);

export default router;
