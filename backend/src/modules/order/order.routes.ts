import express from 'express';
import { Request, Response } from 'express';
import { placeOrder, getMyOrders } from './order.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, (req: Request, res: Response) => {
    placeOrder(req, res);
});

router.get('/my-orders', authMiddleware, (req: Request, res: Response) => {
    getMyOrders(req, res);
});

export default router;
