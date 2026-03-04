import mongoose, { Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    type: 'Music' | 'Comedy' | 'Theatre' | 'Other';
    description: string;
    performers: string[];
    venue: string;
    city: string;
    state: string;
    date: string;
    time: string;
    posterUrl: string;
    tickets: {
        FanPit: { price: number; total: number; available: number };
        VIP: { price: number; total: number; available: number };
        GA: { price: number; total: number; available: number };
    };
}
