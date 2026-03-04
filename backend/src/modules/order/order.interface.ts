import mongoose, { Document } from 'mongoose';

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    // Movie show fields (optional)
    showId?: mongoose.Types.ObjectId;
    movieTitle?: string;
    moviePoster?: string;
    cinemaName?: string;
    showTime?: string;
    showDate?: string;
    seats?: string[];
    // Event fields (optional)
    eventId?: mongoose.Types.ObjectId;
    eventTitle?: string;
    eventPoster?: string;
    venueName?: string;
    eventTime?: string;
    eventDate?: string;
    ticketType?: 'FanPit' | 'VIP' | 'GA';
    // Common
    orderType: 'movie' | 'event';
    quantity: number;
    totalAmount: number;
    paymentMethod: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    bookingTime: Date;
}
