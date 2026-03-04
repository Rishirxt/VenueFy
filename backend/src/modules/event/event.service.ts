import { EventModel } from './event.model';

export const getAllEvents = async (state?: string, type?: string) => {
    const query: any = {};
    if (state) query.state = { $regex: new RegExp(state, 'i') };
    if (type) query.type = type;
    return await EventModel.find(query).sort({ date: 1 });
};

export const getEventById = async (id: string) => {
    return await EventModel.findById(id);
};

export const bookEventTickets = async (eventId: string, ticketType: 'FanPit' | 'VIP' | 'GA', quantity: number) => {
    const event = await EventModel.findById(eventId);
    if (!event) throw new Error('Event not found');

    const ticket = event.tickets[ticketType];
    if (ticket.available < quantity) throw new Error(`Not enough ${ticketType} tickets available`);

    ticket.available -= quantity;
    await event.save();
    return event;
};
