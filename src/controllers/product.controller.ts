import { NextFunction, Response } from "express";
import { TypedRequest, TypedResponse } from "../typings";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { productValidationSchema } from "../services/validation/productValidator";
import { Product } from "../models/product.model";
import { mapProductDocumentToResponse } from "../helpers/product";

// CREATE A PRODUCT
export const create_product = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse> | ApiErrorResponse>,
  next: NextFunction
) => {
  try {
    const { error } = productValidationSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const product = await new Product(req.body);

    const saved_product = await product.save();

    const product_response = mapProductDocumentToResponse(saved_product);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Categories fetched successfully",
      data: product_response,
    };

    res.status(201).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// ADD A REVIEW TO A PRODUCT
export const add_review_to_a_product = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, user_id } = req.params;
    const { rating, review_title, review_content } = req.body;

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReviewIndex = product.reviews.findIndex(
      (review) => review.user.toString() === user_id
    );

    if (existingReviewIndex !== -1) {
      return res.status(400).json({
        success: false,
        message: "User has already reviewed this product",
      });
    }

    const review = {
      user: user_id,
      product: product_id,
      rating,
      review_title,
      review_content,
    };

    product.reviews.push(review);

    const totalReviews = product.reviews.length;
    product.total_reviews = totalReviews;

    const updatedProduct = await product.save();

    const mapped_data = mapProductDocumentToResponse(updatedProduct);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Review added successfully",
      data: mapped_data,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// DELETE A REVIEW FROM A PRODUCT
export const delete_review_from_a_product = async (
  req: TypedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, user_id } = req.params;

    // Find the product
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReviewIndex = product.reviews.findIndex(
      (review) => review.user.toString() === user_id
    );

    if (existingReviewIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Review not found for this user",
      });
    }

    product.reviews.splice(existingReviewIndex, 1);

    const totalReviews = product.reviews.length;
    product.total_reviews = totalReviews;

    const updatedProduct = await product.save();

    const mapped_data = mapProductDocumentToResponse(updatedProduct);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Review deleted successfully",
      data: mapped_data,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};



// GET ALL PRODUCTS
export const get_all_products = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse[]>>,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const no_of_products = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(limit);

    const pagination = {
      totalItems: no_of_products,
      totalPages: Math.ceil(no_of_products / limit),
      currentPage: page,
      hasNextPage: page < Math.ceil(no_of_products / limit),
      hasPrevPage: page > 1,
    };

    const product_response: IProductResponse[] = products.map(
      mapProductDocumentToResponse
    );

    const successResponse: ApiResponse<IProductResponse[]> = {
      success: true,
      message: "Products fetched successfully👍",
      data: product_response,
      pagination: pagination,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS BY CATEGORY
export const get_all_products_by_category = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse[]>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "'name' param cannot be null or empty!!!",
      });
    }

    const products_by_category = await Product.find({ category_id: id }).populate(
      "category"
    );

    if (!products_by_category.length) {
      return res.status(404).json({
        success: false,
        message: `No products found for category: ${id}`,
      });
    }

    const mappedProducts: IProductResponse[] = products_by_category.map(
      mapProductDocumentToResponse
    );

    const successResponse: ApiResponse<IProductResponse[]> = {
      success: true,
      message: `Products fetched successfully for category: ${name}`,
      data: mappedProducts,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET PRODUCT BY ID (SINGLE PRODUCT)
export const get_product_by_ID = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID: ${id}`,
      });
    }

    const mappedProduct: IProductResponse =
      mapProductDocumentToResponse(product);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Product fetched successfully",
      data: mappedProduct,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET ALL PRODUCTS BY REVIEWS (sorted by reviews or rating)
export const get_all_products_by_reviews = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse[]>>,
  next: NextFunction
) => {
  try {
    const { sortBy = "total_reviews", order = "desc" } = req.query;

    const validSortFields = ["total_reviews", "average_rating"];
    if (!validSortFields.includes(sortBy as string)) {
      return res.status(400).json({
        success: false,
        message: `'sortBy' must be one of the following: ${validSortFields.join(", ")}`,
      });
    }

    const products = await Product.find()
      .sort({ [sortBy as string]: order === "desc" ? -1 : 1 })
      .limit(10);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found based on reviews or ratings",
      });
    }

    const mappedProducts: IProductResponse[] = products.map(
      mapProductDocumentToResponse
    );

    const successResponse: ApiResponse<IProductResponse[]> = {
      success: true,
      message: `Products fetched successfully sorted by ${sortBy}`,
      data: mappedProducts,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET A PRODUCTS WITH REVIEWS
export const get_all_products_with_reviews = async (req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse>>,
  next: NextFunction) => {
  try {
    const { product_id } = req.params;
    if (!product_id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const product_with_reviews = await Product.findById(product_id)
      .populate('reviews.user', 'name email')
      .exec();

    if (!product_with_reviews) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID: ${product_id}`,
      });
    }

    const mappedProduct: IProductResponse =
      mapProductDocumentToResponse(product_with_reviews);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Product updated successfully",
      data: mappedProduct,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error)
  }
}

// UPDATE A PRODUCT
export const update_product = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<IProductResponse>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const { error } = productValidationSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID: ${id}`,
      });
    }

    const mappedProduct: IProductResponse =
      mapProductDocumentToResponse(updatedProduct);

    const successResponse: ApiResponse<IProductResponse> = {
      success: true,
      message: "Product updated successfully",
      data: mappedProduct,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// DELETE A PRODUCT
export const delete_product = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<null>>,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `No product found with ID: ${id}`,
      });
    }

    await Product.findByIdAndDelete(id);

    const successResponse: ApiResponse<null> = {
      success: true,
      message: "Product deleted successfully",
      data: null,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};
