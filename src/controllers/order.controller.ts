import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Product } from "../models/product.model";
import { Order } from "../models/order.model";
import { Transcation } from "../models/transaction.model";

// ADD A NEW ORDER (BANK TRANSFER)
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


// ADD A NEW ORDER WITH PAYSTACK PAYMENT
export const add_order_v2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, items, shipping_address, payment_method, email } = req.body;

        if (!user_id || !items || !shipping_address || !payment_method || !email) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let total_price = 0;

        // Calculate total price based on items
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

        // Initialize Paystack Payment
        const paymentData = {
            email, // Customer email
            amount: total_price * 100, // Paystack expects amount in kobo (multiply by 100)
            currency: "NGN",
            callback_url: "http://yourdomain.com/verify-payment", // URL to verify payment
        };

        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            "Content-Type": "application/json",
        };

        const response = await axios.post("https://api.paystack.co/transaction/initialize", paymentData, { headers });

        if (response.data.status === false) {
            return res.status(500).json({
                success: false,
                message: "Payment initialization failed",
            });
        }

        const payment_url = response.data.data.authorization_url; // URL to redirect the user for payment

        // Create new order with payment status 'pending'
        const newOrder = new Order({
            user_id,
            items,
            total_price,
            shipping_address,
            payment_method,
            payment_status: "pending",
            order_status: "pending",
            payment_reference: response.data.data.reference, // Paystack payment reference
        });

        const transaction = new Transcation({
            order_id: newOrder._id,
            user_id: user_id,
            amount: 
        })

        const savedOrder = await newOrder.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully, please proceed to payment",
            data: { savedOrder, payment_url },
        });
    } catch (error) {
        next(error);
    }
};


// UPDATE AN ORDER
export const update_order = async (req: Request, res: Response, next: NextFunction) => {
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

        if (!updated_order) {
            return res.status(400).json({
                success: false,
                message: `Product cannot be updated!!`,
            });
        }

        res.status(201).json({
            success: true,
            message: "Order updated successfully",
            data: updated_order,
        });
    } catch (error) {
        next(error);
    }
}

// UPDATE AN EXISTING ORDER
export const update_order_v2 = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { order_id, user_id, items, shipping_address, payment_method, payment_status, order_status } = req.body;

        if (!order_id || !user_id || !items || !shipping_address || !payment_method) {
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

        const updatedOrder = await Order.findByIdAndUpdate(
            order_id,
            {
                user_id,
                items,
                total_price,
                shipping_address,
                payment_method,
                payment_status: payment_status || "pending",
                order_status: order_status || "pending",
            },
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: `Order with ID ${order_id} not found`,
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder,
        });
    } catch (error) {
        next(error);
    }
};
