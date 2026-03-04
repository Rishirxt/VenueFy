import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './routes/index';
import { globalErrorHandler } from './src/middlewares/error.middleware';
import { config } from './src/config/config';
import connectDB from './src/config/db';

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";
console.log('CORS Configured with Origin:', allowedOrigin);

app.use(cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"]
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to VenueFy API' });
});

app.use('/api', router);
app.use("/api/v1", router);

app.use(globalErrorHandler);

const startServer = async () => {
    const PORT = config.port;

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

export default app;
