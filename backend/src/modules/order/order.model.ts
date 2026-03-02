import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    showId: { type: Schema.Types.ObjectId, ref: 'Show', required: true },
    movieTitle: { type: String, required: true },
    moviePoster: { type: String, required: true },
    cinemaName: { type: String, required: true },
    showTime: { type: String, required: true },
    seats: [{ type: String, required: true }],
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Credit Card' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
    bookingTime: { type: Date, default: Date.now },
}, { timestamps: true });

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
