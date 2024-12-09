import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateParams = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "params validation failed!!",
        error: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};
