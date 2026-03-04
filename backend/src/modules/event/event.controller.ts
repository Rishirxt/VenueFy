import { Request, Response } from 'express';
import * as EventService from './event.service';
import { OrderModel } from '../order/order.model';

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const { state, type } = req.query;
        const events = await EventService.getAllEvents(state as string, type as string);
        res.status(200).json(events);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await EventService.getEventById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const bookEvent = async (req: Request, res: Response) => {
    try {
        const { eventId, ticketType, quantity, totalAmount } = req.body;
        const userId = (req as any).user?.id;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const event = await EventService.bookEventTickets(eventId, ticketType, quantity);

        const order = await OrderModel.create({
            userId,
            eventId,
            eventTitle: event.title,
            eventPoster: event.posterUrl,
            venueName: `${event.venue}, ${event.city}`,
            eventTime: event.time,
            eventDate: event.date,
            ticketType,
            seats: [],
            quantity,
            totalAmount,
            paymentMethod: 'Credit Card',
            status: 'confirmed',
            orderType: 'event',
        });

        res.status(201).json({ message: 'Booking confirmed!', order });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
