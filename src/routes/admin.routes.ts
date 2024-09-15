import { Router } from "express";
import {
  create_product,
  delete_product,
  get_all_products,
  get_all_products_by_category,
  get_all_products_by_reviews,
  update_product,
} from "../controllers/product.controller";
import { verify } from "../services/verifyService";
import {
  create_category,
  delete_a_category,
  get_all_categories,
  get_one_category,
  update_category,
} from "../controllers/category.controller";

const router = Router();

/** ***************************************************** */
/** **************ADMIN CATEGORY ENDPOINTS*************** */
/** ***************************************************** */

// CREATE A CATEGORY
router.route("/category").post(verify, create_category);

// UPDATE A CATEGORY
router.route("/category/update/:id").put(verify, update_category);

// DELETE A CATEGORY
router.route("/category/remove/:id").delete(verify, delete_a_category);

// GET A CATEGORY BY NAME
router.route("/category/:name").get(verify, get_one_category);

// GET ALL CATEGORIES
router.route("/category").get(verify, get_all_categories);

/** ***************************************************** */
/** **************ADMIN PRODUCT ENDPOINTS**************** */
/** ***************************************************** */

// GET ALL PRODUCTS
router.route("/product/all").get(verify, get_all_products);

// GET PRODUCTS BY CATEGORY NAME
router.route("/product/category/:id").get(verify, get_all_products_by_category);

// GET PRODUCTS BY REVIEWS
router.route("/product/reviews").get(verify, get_all_products_by_reviews);

// CREATE A PRODUCT
router.route("/product/create").post(verify, create_product);

// UPDATE A PRODUCT
router.route("/product/update/:id").put(verify, update_product);

// DELETE A PRODUCT
router.route("/product/remove/:id").delete(verify, delete_product);

/** ***************************************************** */
/** **************ADMIN ORDER ENDPOINTS****************** */
/** ***************************************************** */

export default router;
