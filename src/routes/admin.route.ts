import { Router } from "express";
import { create_product, update_product } from "../controllers/product.controller";
import { verify } from "../services/verifyService";

const router = Router();

/** ***************************************************** */
/** **************ADMIN PRODUCT ENDPOINTS**************** */
/** ***************************************************** */

// CREATE A PRODUCT
router.route("/create").post(verify, create_product);

// UPDATE A PRODUCT
router.route("/update/:id").put(verify, update_product);

export default router;