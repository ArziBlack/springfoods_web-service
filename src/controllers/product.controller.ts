import { NextFunction } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { productValidationSchema } from "../services/validation/productValidator";
import { Product } from "../models/product.model";


// CREATE A PRODUCT
export const create_product = async (req: TypedRequest, res: TypedResponse<ApiResponse<IProductResponse> | ApiErrorResponse>, next: NextFunction)=> {
    try {
        const { error } = productValidationSchema.validate(req.body, {abortEarly: false});
        if (error) {
            return res.status(400).json({
              success: false,
              message: "Validation failed",
              errors: error.details.map((detail) => detail.message),
            });
          }

          const product = await new Product(req.body);

          const saved_product: IProductResponse = await product.save();

          const successResponse: ApiResponse<IProductResponse> = {
            success: true,
            message: "Categories fetched successfully",
            data: saved_product,
          };
          res.status(201).json(successResponse);
    } catch (error) {
        next(error);
    }

}