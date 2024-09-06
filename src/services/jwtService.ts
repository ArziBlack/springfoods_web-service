import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/conn";

export interface TokenPayload {
  userId: string | null;
  role?: string | null;
}

export const signToken = (payload: TokenPayload): string => {
  const options: jwt.SignOptions = {
    expiresIn: "2d",
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
