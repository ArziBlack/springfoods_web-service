import { model, Schema, Types, Model } from "mongoose";
import { IContact, IUser } from "../interfaces/user";

// Interface for User Document
interface IUserDocument extends IUser, Document {
  contact: Types.ObjectId | IContact;
  full_name: string;
}

// Interface for User Model
interface IUserModel extends Model<IUserDocument> {
  findByFullName(name: string): Promise<IUserDocument[]>;
}

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
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true },
  }
);

// Virtual for full name
userSchema.virtual("full_name").get(function (this: IUserDocument) {
  if (this.contact && "first_name" in this.contact) {
    return `${this.contact.first_name} ${this.contact.last_name}`.trim();
  }
  return "";
});

// Static method to find by full name
userSchema.static("findByFullName", async function (name: string) {
  return this.find()
    .populate("contact")
    .then((users) => users.filter((user) => user.full_name === name));
});

export const User = model<IUserDocument, IUserModel>("User", userSchema);
