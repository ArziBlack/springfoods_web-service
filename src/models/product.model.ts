import { Schema, model, Types } from "mongoose";
import { reviewSchema } from "./review.model";

const productSchema = new Schema(
  {
    category_id: { type: Types.ObjectId, ref: "Category", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
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
    reviews: [reviewSchema],
    total_reviews: { type: Number, default: 0 },
    is_available: { type: Boolean, default: true },
    tags: [{ type: String }],
    related_products: [{ type: Types.ObjectId, ref: "Product" }],
    vendor_id: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Add middleware to calculate final price before saving
productSchema.pre("save", function (next) {
  if (this.price && this.discount) {
    this.final_price = this.price - this.price * (this.discount / 100);
  } else {
    this.final_price = this.price;
  }
  next();
});

// Add middleware to update average rating and total reviews when a review is added/modified
productSchema.pre("save", function (next) {
  if (this.reviews?.length > 0) {
    this.total_reviews = this.reviews.length;
    const totalRating = this.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    this.average_rating = totalRating / this.total_reviews;
  } else {
    this.total_reviews = 0;
    this.average_rating = 0;
  }
  next();
});

export const Product = model("Product", productSchema);
