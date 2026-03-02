import mongoose from 'mongoose';
import 'dotenv/config';
import { MovieModel } from './src/modules/movie/movie.model';

const inspect = async () => {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
    const movies = await MovieModel.find().limit(2);
    console.log(JSON.stringify(movies, null, 2));
    process.exit(0);
};

inspect();
