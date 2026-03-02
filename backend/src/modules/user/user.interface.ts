import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    role: 'admin' | 'user';
    phone?: string;
    password?: string;
    activateUser: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
