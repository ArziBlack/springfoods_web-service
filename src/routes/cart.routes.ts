import { Router } from "express";
import { verify } from "../services/verifyService";
import { add_to_cart, get_my_cart, remove_item_from_cart } from "../controllers/cart.controller";

const router = Router();

// CREATE CART OR ADD TO CART
router.route("/add/:cart_id").post(verify, add_to_cart);

// GET MY CART
router.route("/:user_id").get(verify, get_my_cart);

// REMOVE FROM CART OR UPDATE CART
router.route("/:user_id/:product_id").put(verify, remove_item_from_cart);

export default router;
