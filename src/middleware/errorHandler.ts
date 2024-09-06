import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      message: err.message,
      errors: undefined,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      errors: undefined,
    });
  }
};
