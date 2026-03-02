import { IOrder } from './order.interface';
import { OrderModel } from './order.model';
import { updateMultipleSeatsStatus } from '../show/show.service';

export const createOrder = async (orderData: Partial<IOrder>): Promise<IOrder> => {
    const order = new OrderModel(orderData);
    const savedOrder = await order.save();

    // Block the seats in the show
    if (orderData.showId && orderData.seats) {
        await updateMultipleSeatsStatus(
            orderData.showId as string,
            orderData.seats as string[],
            "BOOKED"
        );
    }

    return savedOrder;
}

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
    return await OrderModel.find({ userId }).sort({ createdAt: -1 });
}
