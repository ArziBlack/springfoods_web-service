import { model, Schema } from "mongoose";

const deliverySchema = new Schema({
    from: { type: String },
    to: { type: String },
    amount: { type: Number }
});

export const DeliveryFee = model("Delivery", deliverySchema);