import { Router } from "express";
import { create_category } from "../controllers/category.controller";
import { verify } from "../services/verifyService";

const router = Router();

// CREATE A CATEGORY
router.route("/create").post(verify, create_category);

export default router;