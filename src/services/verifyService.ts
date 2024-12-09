import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/conn";
import { TokenPayload } from "./jwtService";
import { Role } from "../interfaces/enums";

export async function verify(req: Request, res: Response, next: NextFunction) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err)
        return res.status(403).json({
          success: false,
          message: "Token Cannot be Verified!!!",
        });
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authenticated",
    });
  }
}

export async function verify_email_token(token: string) {
  const decoded = (await jwt.verify(token, process.env.JWT_SECRET)) as {
    userId: string;
  };
  return decoded;
}

export async function verify_vendor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({
          success: false,
          message: "Token Cannot be Verified!!!",
        });

      const user = decoded as TokenPayload;

      if (user.role !== Role.VENDOR) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource",
        });
      }

      req.user = user;

      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authenticated",
    });
  }
}

export async function verify_admin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
      if (err)
        return res.status(403).json({
          success: false,
          message: "Token Cannot be Verified!!!",
        });

      const user = decoded as TokenPayload;

      if (user.role !== Role.VENDOR) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to access this resource",
        });
      }

      req.user = user;

      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "You are not Authenticated",
    });
  }
}
