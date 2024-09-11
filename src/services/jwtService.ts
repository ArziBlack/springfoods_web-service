import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/conn";

export interface TokenPayload {
  userId: string | null;
  role?: string | null;
}

export const signToken = async (payload: TokenPayload): Promise<string> => {
  const options: jwt.SignOptions = {
    expiresIn: "2d",
  };

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  console.log(JWT_SECRET);
  return await jwt.sign(payload, JWT_SECRET, options);
};
