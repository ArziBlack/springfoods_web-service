import { Types } from "mongoose";
import { Document, ObjectId } from "mongoose";

interface ISigninResponse {
  id?: string;
  password?: string;
  role: "user" | "admin" | "vendor" | null;
  gender: "male" | "female" | "non-binary" | "prefer not to say" | null;
  email: string | null;
  profile_image: string | null;
  date_of_birth: Date | null;
  isEmailVerified: boolean | null;
  last_login: Date | null;
  token?: string | null;
  contact: Types.ObjectId | IContact;
  createdAt: Date | null;
  updatedAt: Date | null;
}
