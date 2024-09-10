import { NextFunction, Request, Response } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { Category } from "../models/category.model";
import { categoryValidationSchema } from "../services/validation/categoryValidation";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { ICategoryResponse, ICreateCategory } from "../interfaces/category";

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
export const get_all_categories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories: ICategoryResponse[] = await Category.find();

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

// GET A CATEGORY BY NAME
export const get_one_category = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.params?.name;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "'name' param cannot be null or empty!!!",
      });
    }
    const category: ICategoryResponse = await Category.findOne({ name: name });

    const successResponse: ApiResponse<ICategoryResponse> = {
      success: true,
      message: "Categories fetched successfully",
      data: category,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// UPDATE A CATEGORY
export const update_category = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Body cannot be empty or Null!!!",
      });
    }
    const updateCategory: ICategoryResponse = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    const successResponse: ApiResponse<ICategoryResponse> = {
      success: true,
      message: "Categories successfully Updated!",
      data: updateCategory,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// DELETE A CATEGORY
export const delete_a_category = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }
    const deleteCategory: ICategoryResponse = await Category.findByIdAndDelete({
      _id: req.params.id,
    });
    const successResponse: ApiResponse<ICategoryResponse> = {
      success: true,
      message: "Categories successfully Updated!",
      data: deleteCategory,
    };
    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
