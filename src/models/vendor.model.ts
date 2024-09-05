import { Schema, model } from "mongoose";

const vendorSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business_name: {
      type: String,
      required: true,
    },
    business_email: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    business_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    website: {
      type: String,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    ratings: {
      type: Number,
      default: 0, 
    },
    total_sales: {
      type: Number,
      default: 0,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    business_logo: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Vendor = model("Vendor", vendorSchema);
