import { Router } from "express";
import { verify_vendor } from "../services/verifyService";
import {
  create_product,
  delete_product,
  get_all_products,
  get_all_products_by_category,
  get_all_products_by_reviews,
  update_product,
} from "../controllers/product.controller";

const router = Router();

/** ***************************************************** */
/** *************VENDOR PRODUCT ENDPOINTS**************** */
/** ***************************************************** */

// GET ALL PRODUCTS
router.route("/product/all").get(verify_vendor, get_all_products);

// GET PRODUCTS BY CATEGORY NAME
router
  .route("/product/category/:id")
  .get(verify_vendor, get_all_products_by_category);

// GET PRODUCTS BY REVIEWS
router
  .route("/product/reviews")
  .get(verify_vendor, get_all_products_by_reviews);

// CREATE A PRODUCT
router.route("/product/create").post(verify_vendor, create_product);

// UPDATE A PRODUCT
router.route("/product/update/:id").put(verify_vendor, update_product);

// DELETE A PRODUCT
router.route("/product/remove/:id").delete(verify_vendor, delete_product);

export default router;
