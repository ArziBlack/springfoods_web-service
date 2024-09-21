import { Schema, model, Types } from "mongoose";

export const cartItemSchema = new Schema({
  cart_id: { type: String },
  product: { type: Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
}, { _id: true });

export const CartItem = model("CartItem", cartItemSchema);
