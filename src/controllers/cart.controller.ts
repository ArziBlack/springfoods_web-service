import { NextFunction, Request, Response } from "express";
import { ICart, ICartItem } from "../interfaces/cart";
import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cart_item.model";
import { TypedRequest, TypedResponse } from "../typings";
// import { mapCartDocumentToResponse } from "../helpers/cart";
import { ApiErrorResponse, ApiResponse } from "../typings/response";
import { cartValidatorSchema } from "../services/validation/cartValidator";

// ADD TO CART
export const add_to_cart = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<ICart> | ApiErrorResponse>,
  next: NextFunction,
) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const { error } = cartValidatorSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });
    }

    const { items, price, total } = req.body;

    let cart = await Cart.findOne({ user_id: user_id }).lean();

    if (!cart) {
      cart = new Cart({ user_id: user_id, items: [], price: 0, total: 0 });
    }

    const new_cart_items = items.map(
      (item: any) =>
        new CartItem({
          cart_id: cart._id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        }),
    );

    cart.items.push(...new_cart_items);

    cart.price += price;
    cart.total += total;

    const saved_cart = await cart.save();

    // const mapped_cart = mapCartDocumentToResponse(cart);

    const successResponse: ApiResponse<ICart> = {
      success: true,
      message: "cart updated successfully👍",
      data: saved_cart,
    };

    res.status(201).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// GET MY CART
export const get_my_cart = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<ICart> | ApiErrorResponse>,
  next: NextFunction,
) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }

    const my_cart = await Cart.findOne({ user_id: user_id }).lean();

    if (!my_cart) {
      return res.status(404).json({
        success: false,
        message: "No Cart Found😒😒",
      });
    }

    // const cart_response = mapCartDocumentToResponse(my_cart);

    const successResponse: ApiResponse<ICart> = {
      success: true,
      message: "Categories fetched successfully",
      data: my_cart,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};


// REMOVE ITEM FROM CART OR UPDATE CART
export const remove_item_from_cart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, product_id } = req.params;
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    if (!req.body) {
      return res.status(404).json({
        success: false,
        message: "Request Not found!!",
      });
    }

    const item: ICartItem = cart.items.find(itm => itm.product === product_id);

    // const saved = await Cart.findOneAndUpdate({user_id: cart_id}, {$set: { items: new_items, price: new_price, total: new_total}}, { new: true });

    const saved = await Cart.findOneAndUpdate({ user_id: user_id }, { $set: req.body }, { new: true });

    if (!saved) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};