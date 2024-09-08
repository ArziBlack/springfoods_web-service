import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "vendor"],
      default: "user",
      required: true,
    },
    total_no_of_purchases: {
      type: Number,
      default: 0,
      required: true,
    },
    profile_image: {
      type: String,
      default: "default_profile_image_url",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer not to say"],
      required: true,
    },
    contact: {
      type: Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    date_of_birth: {
      type: Date,
      // required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export const User = model("User", userSchema);
