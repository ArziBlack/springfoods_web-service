import { Schema, model, Types } from "mongoose";
import { ICart } from "../interfaces/cart";
import { cartItemSchema } from "./cart_item.model";

const cartSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  items: {type : [cartItemSchema]},
  price: { type: Number, required: true },
  total: { type: Number, required: true },
});

export const Cart = model<ICart>("Cart", cartSchema);
