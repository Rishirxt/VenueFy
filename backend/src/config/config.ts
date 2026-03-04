import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
        console.log("Connected to database");
    } catch (error) {
        console.log("Failed to connect database", error);
        process.exit(1);
    }
};

export const config = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.MONGO_CONNECTION_STRING,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'venuefy_access_token_secret_456',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'venuefy_refresh_token_secret_789',
};

export default connectDB;