import mongoose from 'mongoose';
import 'dotenv/config';

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
        const movie = await mongoose.connection.db.collection('movies').findOne({});
        if (movie) {
            console.log("Keys in movie document:", Object.keys(movie));
            console.log("Full movie document sample:", JSON.stringify(movie, null, 2));
        } else {
            console.log("No movies found in database.");
        }
        process.exit(0);
    } catch (error) {
        console.error("Check failed:", error);
        process.exit(1);
    }
};

check();
