import mongoose, { Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from 'bcryptjs';

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional because of unified flow (some might use Oauth later)
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    phone: { type: String },
    activateUser: { type: Boolean, default: false },
}, {
    timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<IUser>('User', userSchema);