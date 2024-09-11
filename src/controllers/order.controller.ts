import { Request, Response, NextFunction } from "express";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";

// ADD A NEW ORDER
export const add_order = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, items, shipping_address, payment_method } = req.body;

        if (!user_id || !items || !shipping_address || !payment_method) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let total_price = 0;

        for (const item of items) {
            const product = await Product.findById(item.product_id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product with ID ${item.product_id} not found`,
                });
            }

            total_price += product.price as number * item.quantity as number;
        }

        const newOrder = new Order({
            user_id,
            items,
            total_price,
            shipping_address,
            payment_method,
            payment_status: "pending",
            order_status: "pending",
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: savedOrder,
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE AN ORDER
export const update_order = async (req, res, next) => {
    try {
        const { order_id, user_id, items, shipping_address, payment_method } = req.body;
        if (!order_id || !user_id || !items || !shipping_address || !payment_method) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const existing_order = await Order.findById(order_id);
        if (!existing_order) {
            return res.status(400).json({
                success: false,
                message: `Order with ID: ${order_id} not found!!`,
            });
        }

        let total_price = 0;

        for (const item of items) {
            const product = await Product.findById(item.product_id)
            if (!product) {
                return res.status(400).json({
                    success: false,
                    message: `Product with ID: ${item.product_id} not found!!`,
                });
            }
            total_price += (product.price as number) * (items.quantity as number);
        }

        existing_order.items = items;
        existing_order.total_price = total_price;
        existing_order.shipping_address = shipping_address;
        existing_order.payment_method = payment_method;
        

        const updated_order = await existing_order.save();

        res.status(201).json({
            success: true,
            message: "Order updated successfully",
            data: updated_order,
        });
    } catch (error) {
        next(error);
    }
}