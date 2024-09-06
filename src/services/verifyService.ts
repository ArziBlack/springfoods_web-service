import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function verify(req: Request, res: Response, next: NextFunction) {
  const authHeader = await req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      (err: any, user: any) => {
        if (err) return res.status(403).json("Token cannot be verified!!!");
        next();
      },
    );
  } else {
    return res.status(401).json("You are not Authenticated");
  }
}
