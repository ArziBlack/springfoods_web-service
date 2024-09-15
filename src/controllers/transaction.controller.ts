import { NextFunction, Request, Response } from "express";
import { Order } from "../models/order.model";

// VERIFY PAYSTACK PAYMENT
export const verify_payment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { reference } = req.query;

      if (!reference) {
        throw new Error("Missing reference query (not sent!!).");
      }
  
      const headers = {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      };
  
      const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers });
  
      if (response.data.status === false) {
        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
  
      const paymentStatus = response.data.data.status;
  
      if (paymentStatus === "success") {
        const updatedOrder = await Order.findOneAndUpdate(
          { payment_reference: reference },
          { payment_status: "paid", order_status: "processing" },
          { new: true }
        );
  
        if (!updatedOrder) {
          return res.status(404).json({
            success: false,
            message: "Order not found",
          });
        }
  
        res.status(200).json({
          success: true,
          message: "Payment verified and order updated",
          data: updatedOrder,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Payment not successful",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  