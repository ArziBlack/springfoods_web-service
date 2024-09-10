import { NextFunction } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { reviewValidationSchema } from "../services/validation/reviewValidator";
import { Product } from "../models/product.model";
import { Review } from "../models/review.model";
import { mapReviewDocumentToResponse } from "../helpers/review";

// CREATE A REVIEW FOR A PRODUCT
export const create_review = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse> | ApiErrorResponse>,
  next: NextFunction
) => {
  try {
    // "id" as Product ID
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const { error } = reviewValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const product_to_review = await Product.findById(id);

    if (!product_to_review) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID: ${id}`,
      });
    }

    const review = await new Review(req.body);
    const saved_review = await review.save();

    const total_reviews = (product_to_review.total_reviews as number) + 1;

    const update_product_to_review = await Product.findByIdAndUpdate(
      id,
      {
        total_reviews: total_reviews,
      },
      { new: true }
    );

    if (!update_product_to_review) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID 😒 to update: ${id}`,
      });
    }

    const review_response = mapReviewDocumentToResponse(saved_review);

    const successResponse: ApiResponse<IReviewResponse> = {
      success: true,
      message: "Review successfully created👍😊",
      data: review_response,
    };
    
    res.status(201).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET ALL REVIEWS
export const get_all_reviews = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IReviewResponse[]>>,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const no_of_reviews = await Review.countDocuments();
    const reviews = await Review.find().skip(skip).limit(limit);

    const pagination = {
      totalItems: no_of_reviews,
      totalPages: Math.ceil(no_of_reviews / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(no_of_reviews / limit),
      hasPrevPage: page > 1,
    };

    const review_response: IReviewResponse[] = reviews.map(
      mapReviewDocumentToResponse
    );

    const successResponse: ApiResponse<IReviewResponse[]> = {
      success: true,
      message: "Categories fetched successfully",
      data: review_response,
      pagination: pagination,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET ALL REVIEWS OF A PRODUCT

// UPDATE A REVIEW

// DELETE A REVIEW
