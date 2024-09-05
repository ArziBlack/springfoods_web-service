import { Schema, model, Types } from "mongoose";
import { CartItem } from "./cart_item.model";

const cartSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  items: [CartItem],
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

export const Cart = model("Cart", cartSchema);