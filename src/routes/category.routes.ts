import { Router } from "express";
import {
  get_all_categories,
  get_one_category,
} from "../controllers/category.controller";

const router = Router();

// GET A CATEGORY BY NAME
router.route("/:name").get(get_one_category);

// GET ALL CATEGORIES
router.route("/").get(get_all_categories);

export default router;
