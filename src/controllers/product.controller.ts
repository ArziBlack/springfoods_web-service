import { NextFunction } from "express";
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

    const product_response: IProductResponse[] = products.map(mapProductDocumentToResponse);

    const successResponse: ApiResponse<IProductResponse[]> = {
      success: true,
      message: "Categories fetched successfully",
      data: product_response,
      pagination: pagination
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
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "'name' param cannot be null or empty!!!",
      });
    }

    const products_by_category = await Product.find({ name: name }).populate('category');

    if (!products_by_category.length) {
      return res.status(404).json({
        success: false,
        message: `No products found for category: ${name}`,
      });
    }

    const mappedProducts: IProductResponse[] = products_by_category.map(mapProductDocumentToResponse);

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

    const mappedProduct: IProductResponse = mapProductDocumentToResponse(product);

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
    const { sortBy = 'total_reviews', order = 'desc' } = req.query;

    const validSortFields = ['total_reviews', 'average_rating'];
    if (!validSortFields.includes(sortBy as string)) {
      return res.status(400).json({
        success: false,
        message: `'sortBy' must be one of the following: ${validSortFields.join(', ')}`,
      });
    }

    const products = await Product.find()
      .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
      .limit(10);

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: 'No products found based on reviews or ratings',
      });
    }

    const mappedProducts: IProductResponse[] = products.map(mapProductDocumentToResponse);

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

    const { error } = productValidationSchema.validate(req.body, { abortEarly: false });
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

    const mappedProduct: IProductResponse = mapProductDocumentToResponse(updatedProduct);

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
