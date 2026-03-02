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
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
};

export default connectDB;