import { Document, Schema } from "mongoose";

interface ICartItem {
  product: Schema.Types.ObjectId | string;
  quantity: number;
  price: number;
}

interface ICart extends Document {
  _id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId | string;
  items: ICartItem[] | Array<any>;
  price: number;
  total: number;
}
