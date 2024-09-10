import { NextFunction } from "express";
import { ICart } from "../interfaces/cart";
import { Cart } from "../models/cart.model";
import { CartItem } from "../models/cart_item.model";
import { TypedRequest, TypedResponse } from "../typings";
import { mapCartDocumentToResponse } from "../helpers/cart";
import { ApiErrorResponse, ApiResponse } from "../typings/response";

// ADD TO CART
export const add_to_cart = async (
  req: TypedRequest,
  res: TypedResponse<ApiResponse<ICart> | ApiErrorResponse>,
  next: NextFunction
) => {
  try {
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }
    const { items, price, total } = req.body;

    let cart = await Cart.findOne({ user_id: user_id });

    if (!cart) {
      cart = new Cart({ user_id: user_id, items: [], price: 0, total: 0 });
    }

    const new_cart_items = items.map(
      (item: any) =>
        new CartItem({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })
    );

    cart.items.push(...new_cart_items);

    cart.price += price;
    cart.total += total;

    await cart.save();

    const mapped_cart = mapCartDocumentToResponse(cart);

    const successResponse: ApiResponse<ICart> = {
      success: true,
      message: "cart updated successfully👍",
      data: mapped_cart,
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
  next: NextFunction
) => {
  try {
    const cart_id = req.params.cart_id;

    if (!cart_id) {
      return res.status(400).json({
        success: false,
        message: "'id' param cannot be null or empty!!!",
      });
    }
    const my_cart = await Cart.findOne({ user_id: cart_id });

    if (!my_cart) {
      return res.status(404).json({
        success: false,
        message: "No Cart Found😒😒",
      });
    }

    const cart_response = mapCartDocumentToResponse(my_cart);

    const successResponse: ApiResponse<ICart> = {
      success: true,
      message: "Categories fetched successfully",
      data: cart_response,
    };

    res.status(200).json(successResponse);
  } catch (error) {
    next(error);
  }
};

// REMOVE ITEMS FROM CART
