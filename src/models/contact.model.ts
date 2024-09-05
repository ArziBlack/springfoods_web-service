import { model, Schema } from "mongoose";

const contactSchema = new Schema({
  email: { type: String, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String, unique: true },
  zip_code: { type: Number },
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
}, { timestamps: true });

export const Contact = model("Contact", contactSchema);
