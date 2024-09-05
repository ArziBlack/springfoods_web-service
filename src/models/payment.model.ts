import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    payment_method: {
      type: String,
      enum: ["credit_card", "paypal", "bank_transfer", "cash_on_delivery"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    transaction_id: {
      type: String,
    },
    paid_at: {
      type: Date,
      default: null,
    },
    refund_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
