import { model, Schema } from "mongoose";

const productSchema = new Schema({
  category_id: { type: String },
  brand_id: { type: String },
  name: { type: String },
  featured: { type: Boolean },
  quantity: { type: Number },
  product_image: { type: String },
  description: { type: String },
});

export const Product = model("Product", productSchema);
