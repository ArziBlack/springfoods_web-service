import { Schema, model, Document } from "mongoose";

const orderItemSchema = new Schema({
  product_id: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    total_price: {
      type: Number,
      required: true,
    },
    shipping_address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip_code: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    payment_reference: { type: String },
    payment_method: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "cash_on_delivery"],
      required: true,
    },
    order_status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    tracking_number: {
      type: String,
      default: null,
    },
    is_delivered: {
      type: Boolean,
      default: false,
    },
    delivered_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

export const Order = model("Order", orderSchema);
