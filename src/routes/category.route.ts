import { Router } from "express";
import { create_category } from "../controllers/category.controller";

const router = Router();

// CREATE A CATEGORY
router.route("/create").post(create_category);

export default router;