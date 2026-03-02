import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
        console.log("Connected to database");
    }
    catch(error){
        console.log("Failed to connect database", error);
        process.exit(1);
    }
};
export default connectDB;