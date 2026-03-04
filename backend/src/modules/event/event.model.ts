import mongoose, { Schema } from 'mongoose';
import { IEvent } from './event.interface';

const ticketTypeSchema = new Schema({
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    available: { type: Number, required: true },
}, { _id: false });

const eventSchema = new Schema<IEvent>({
    title: { type: String, required: true },
    type: { type: String, enum: ['Music', 'Comedy', 'Theatre', 'Other'], required: true },
    description: { type: String, required: true },
    performers: [{ type: String }],
    venue: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    posterUrl: { type: String, required: true },
    tickets: {
        FanPit: ticketTypeSchema,
        VIP: ticketTypeSchema,
        GA: ticketTypeSchema,
    }
}, { timestamps: true });

export const EventModel = mongoose.model<IEvent>('Event', eventSchema);
