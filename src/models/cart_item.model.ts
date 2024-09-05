import { Schema, model, Types } from "mongoose";

const cartItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

export const CartItem = model("CartItem", cartItemSchema);