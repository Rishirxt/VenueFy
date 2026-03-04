import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // Movie show fields
    showId: { type: Schema.Types.ObjectId, ref: 'Show' },
    movieTitle: { type: String },
    moviePoster: { type: String },
    cinemaName: { type: String },
    showTime: { type: String },
    showDate: { type: String },
    seats: [{ type: String }],
    // Event fields
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    eventTitle: { type: String },
    eventPoster: { type: String },
    venueName: { type: String },
    eventTime: { type: String },
    eventDate: { type: String },
    ticketType: { type: String, enum: ['FanPit', 'VIP', 'GA'] },
    // Common fields
    orderType: { type: String, enum: ['movie', 'event'], default: 'movie' },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: 'Credit Card' },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' },
    bookingTime: { type: Date, default: Date.now },
}, { timestamps: true });

export const OrderModel = mongoose.model<IOrder>('Order', orderSchema);
