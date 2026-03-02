import { Request, Response } from 'express';
import { createUser, getUserByEmail, getUserById } from '../user/user.service';
import { generateToken, storeRefreshToken } from './token.service';
import { IUser } from '../user/user.interface';

export const unifiedLoginSignup = async (req: Request, res: Response) => {
    try {
        const { email, name, phone, password, isSignup } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        let user = await getUserByEmail(email);

        if (user && isSignup) {
            return res.status(400).json({ message: 'Email already registered. Please sign in instead.' });
        }

        if (!user) {
            if (!name) {
                return res.status(400).json({ message: 'New user? Please provide your name to sign up.' });
            }
            const userData: any = {
                email,
                name,
                role: 'user',
                activateUser: true,
                password // Will be hashed by pre-save hook
            };
            if (phone) userData.phone = phone;

            user = await createUser(userData);
        } else {
            // If user exists, check password if provided
            if (password && user.password) {
                const isMatch = await (user as any).comparePassword(password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Invalid credentials (Password mismatch)' });
                }
            } else if (password && !user.password) {
                // If user exists but has no password (e.g. created before password was required)
                // We can choose to set it or just let them in. Let's set it.
                user.password = password;
                await user.save();
            }
        }

        const payload = { id: (user as any)._id.toString(), phone: user.phone || '', email: user.email, role: user.role };
        const { accessToken, refreshToken } = await generateToken(payload);

        await storeRefreshToken((user as any)._id.toString(), refreshToken);

        res.status(200).json({
            message: 'Success',
            user: {
                id: (user as any)._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            tokens: {
                accessToken,
                refreshToken
            }
        });
    } catch (error: any) {
        console.error('Unified Login/Signup Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

export const changePasswordController = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { oldPassword, newPassword } = req.body;

        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check old password
        if (user.password) {
            const isMatch = await (user as any).comparePassword(oldPassword);
            if (!isMatch) {
                return res.status(401).json({ message: 'Incorrect old password' });
            }
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error: any) {
        console.error('Change Password Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}
