import mongoose from "mongoose";

export interface IOtp {
    email: string;
    otp: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IRefreshTokenPayload {
    token: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    expiresAt: Date;
}
export interface ITokenPayload {
    id: string;
    phone: string;
    role?: string;
    email?: string;
}