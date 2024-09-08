import { NextFunction, Request, Response } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { Category } from "../models/category.model";
import { categoryValidationSchema } from "../services/validation/categoryValidation";
import { ApiErrorResponse, ApiResponse } from "../typings/response";

// CREATE A CATEGORY
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

    const category = new Category(req.body);

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
      message: "Categories fetched successfully",
      data: response,
    };
    res.status(201).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET ALL CATEGORIES
export const get_all_categories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories:ICategoryResponse[]  = await Category.find();

    const successResponse: ApiResponse<ICategoryResponse[]> = {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    };
    
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
