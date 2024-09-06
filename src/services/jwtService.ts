import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/conn';
import { ObjectId } from 'mongoose';

export interface TokenPayload {
  userId?: ObjectId;
  role?: string;
}

export const signToken = (payload: TokenPayload): string => {
  const options: jwt.SignOptions = {
    expiresIn: '2d',
  };

  return jwt.sign(payload, JWT_SECRET, options);
};
