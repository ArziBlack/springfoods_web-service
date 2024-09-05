import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, unique: true },
  image: { type: String },
  slug: { type: String },
});

export const Category = model("Category", categorySchema);
