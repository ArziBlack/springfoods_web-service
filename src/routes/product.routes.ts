import { Router } from "express";
import {
  add_review_to_a_product,
  get_all_products,
  get_all_products_by_category,
  get_all_products_by_reviews,
  get_all_products_with_reviews,
  get_featured_products,
  get_product_by_ID,
} from "../controllers/product.controller";
import { verify } from "../services/verifyService";

const router = Router();

// GET ALL PRODUCTS
router.route("/").get(get_all_products);

// GET PRODUCTS BY CATEGORY ID
router.route("/category/:id").get(verify, get_all_products_by_category);

// GET PRODUCTS BY REVIEWS
router.route("/reviews").get(verify, get_all_products_by_reviews);

// GET PRODUCTS WITH REVIEWS
router.route("/reviews/:product_id").get(verify, get_all_products_with_reviews);

// ADD REVIEW TO A PRODUCT
router.route("/review/:user_id/:product_id").post(verify, add_review_to_a_product);

// GET PRODUCT BY ID (SINGLE PRODUCT)
router.route("/:id").get(verify, get_product_by_ID);

// GET FEATURED PRODUCTS
router.route("/featured").get(verify, get_featured_products);

export default router;