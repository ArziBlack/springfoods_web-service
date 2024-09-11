import { Router } from "express";
import {
  get_all_products,
  get_all_products_by_category,
  get_all_products_by_reviews,
} from "../controllers/product.controller";
import { verify } from "../services/verifyService";

const router = Router();

// GET ALL PRODUCTS
router.route("/all").get(verify, get_all_products);

// GET PRODUCTS BY CATEGORY NAME
router.route("/category/:id").get(verify, get_all_products_by_category);

// GET PRODUCTS BY REVIEWS
router.route("/reviews/:user_id/:product_id").get(verify, get_all_products_by_reviews);

export default router;
