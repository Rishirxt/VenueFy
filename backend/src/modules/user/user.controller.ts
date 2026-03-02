import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { activateUser, createUser, getAllUsers, getUserById, updateUser } from "./user.service";

// Create User
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await createUser(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// Get All Users
export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getAllUsers();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// Get Single User
export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await getUserById(id);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// activate User
export const activateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const result = await activateUser(id, updateData);
        res.status(200).json({
            success: true,
            message: 'User activated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

// Update Me
export const updateMeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const updateData = req.body;
        const result = await updateUser(userId, updateData);
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
}