import { NextFunction, Response } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { Category } from "../models/category.model";
import { categoryValidationSchema } from "../services/validation/categoryValidation";

export const create_category = async (
  req: TypedRequest<ICreateCategory>,
  res: TypedResponse<
    ICategoryResponse | ApiErrorResponse | ApiResponse<ICategoryResponse>
  >,
  next: NextFunction
) => {
  try {
    const { error } = categoryValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const category = new Category({
      name: req.body.name,
      image: req.body.image,
      slug: req.body.slug,
    });

    const savedCategory = await category.save();
    const { name, image, slug } = savedCategory;

    if (!name || !image || !slug) {
      throw new Error("Missing required fields in the saved category data.");
    }

    const response: ICategoryResponse = {
      name: savedCategory.name ?? "",
      image: savedCategory.image ?? "",
      slug: savedCategory.slug ?? "",
    };

    const successResponse: ApiResponse<ICategoryResponse> = {
      success: true,
      message: "User fetched successfully",
      data: response,
    };
    res.status(201).json(successResponse);
  } catch (error) {
        next(error);
  }
};
