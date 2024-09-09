import { Schema, model, Types } from "mongoose";

const reviewSchema = new Schema(
  {
    user_id: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "User", required: true },
    product: { type: Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review_title: { type: String, maxlength: 100 },
    review_content: { type: String, maxlength: 500 },
  },
  { timestamps: true },
);

export const Review = model("Review", reviewSchema);
