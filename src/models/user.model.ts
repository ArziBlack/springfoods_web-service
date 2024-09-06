import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    password: { type: String },
    email: { type: String },
    role: { type: String, enum: ["user", "admin", "vendor"], default: "user" },
    total_no_of_purchases: { type: Number },
    profile_image: { type: String },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer not to say"],
    },
    contact: { type: Types.ObjectId, ref: "Contact" },
    date_of_birth: { type: Date },
    isEmailVerified: { type: Boolean, default: false },
    last_login: { type: Date },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
