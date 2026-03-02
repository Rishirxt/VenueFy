import { ITokenPayload } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';
import { RefreshTokenModel } from "./refresh.model";

export const generateToken = async (payload: ITokenPayload): Promise<{ accessToken: string, refreshToken: string }> => {
    const accessToken = jwt.sign(payload, config.accessTokenSecret, { expiresIn: '1h' });
    const refreshToken = jwt.sign(payload, config.refreshTokenSecret, { expiresIn: '7d' });
    return { accessToken, refreshToken };
}

// store refresh token in database
export const storeRefreshToken = async (userId: string, token: string): Promise<void> => {
    await RefreshTokenModel.findOneAndUpdate(
        { userId },
        { token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
        { upsert: true, new: true }
    );
}

// verify access token
export const verifyAccessToken = (token: string): ITokenPayload | JwtPayload => {
    return jwt.verify(token, config.accessTokenSecret) as ITokenPayload | JwtPayload;
}

// verify refresh token
export const verifyRefreshToken = (token: string): ITokenPayload | JwtPayload => {
    return jwt.verify(token, config.refreshTokenSecret) as ITokenPayload | JwtPayload;
}

// DB Operations on refresh token
export const findRefreshToken = async (userId: string, token: string) => {
    return await RefreshTokenModel.findOne({ userId, token });
}

export const deleteRefreshToken = async (userId: string, token: string) => {
    return await RefreshTokenModel.deleteOne({ userId, token });
}