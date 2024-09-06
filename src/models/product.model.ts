import { Schema, model, Types } from "mongoose";

const productSchema = new Schema(
  {
    category_id: { type: Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    featured: { type: Boolean, default: false },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    final_price: { type: Number },
    sku: { type: String, unique: true },
    stock: { type: Number, required: true },
    product_image: { type: String },
    description: { type: String, maxlength: 2000 },
    weight: { type: Number },
    dimensions: {
      height: { type: Number },
      width: { type: Number },
      depth: { type: Number },
    },
    sizes: [{ type: String }],
    average_rating: { type: Number, default: 0 },
    total_reviews: { type: Number, default: 0 },
    is_available: { type: Boolean, default: true },
    tags: [{ type: String }],
    related_products: [{ type: Types.ObjectId, ref: "Product" }],
    vendor_id: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Product = model("Product", productSchema);
