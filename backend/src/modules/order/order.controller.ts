import { Request, Response } from 'express';
import { createOrder, getOrdersByUserId } from './order.service';

export const placeOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const orderData = { ...req.body, userId };
        const order = await createOrder(orderData);
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error: any) {
        console.error('Place Order Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}

export const getMyOrders = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const orders = await getOrdersByUserId(userId);
        res.status(200).json({ orders });
    } catch (error: any) {
        console.error('Get My Orders Error:', error);
        res.status(500).json({ message: error.message || 'Internal Server Error' });
    }
}
