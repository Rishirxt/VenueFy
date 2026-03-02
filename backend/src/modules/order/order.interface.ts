import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    showId: mongoose.Types.ObjectId;
    movieTitle: string;
    moviePoster: string;
    cinemaName: string;
    showTime: string;
    seats: string[];
    quantity: number;
    totalAmount: number;
    paymentMethod: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    bookingTime: Date;
}
