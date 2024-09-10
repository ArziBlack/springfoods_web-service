import { Schema } from "mongoose";

interface ICartItem {
  product: Schema.Types.ObjectId;
  quantity: number;
  price: number;
}

interface ICart {
  user_id: Schema.Types.ObjectId;
  items: ICartItem[];
  price: number;
  total: number;
}
