import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEventById, bookEventTicket } from '../apis';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

// Base ticket metadata (descriptions, colours) — prices come from the event DB record
const TICKET_META = {
    GA: { label: 'General Admission', emoji: '🎟️', desc: 'Standing area, general access', color: 'from-green-500 to-emerald-600' },
    VIP: { label: 'VIP', emoji: '⭐', desc: 'Reserved seating, priority entry & lounge', color: 'from-blue-500 to-indigo-600' },
    FanPit: { label: 'Fan Pit', emoji: '🔥', desc: 'Front-row access, closest to the stage', color: 'from-[#f84464] to-rose-600' },
};

const TICKET_ORDER = ['GA', 'VIP', 'FanPit'];

const ConfirmationScreen = ({ event, selectedTicket, quantity, totalAmount }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Your tickets are locked in. Have a great show!</p>

                <div className="bg-gray-50 rounded-2xl p-5 text-left space-y-3 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Event</span>
                        <span className="font-bold text-gray-900 text-right max-w-[60%]">{event.title}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Venue</span>
                        <span className="font-bold text-gray-900">{event.city}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Ticket Type</span>
                        <span className="font-bold text-gray-900">{TICKET_META[selectedTicket]?.label} {TICKET_META[selectedTicket]?.emoji}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Quantity</span>
                        <span className="font-bold text-gray-900">{quantity}</span>
                    </div>
                    <div className="flex justify-between font-black text-base mt-3 pt-3 border-t border-gray-100">
                        <span>Total Paid</span>
                        <span className="text-[#f84464]">₹{totalAmount.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('/profile?tab=orders')}
                        className="flex-1 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:border-gray-300 transition-colors"
                    >
                        View Orders
                    </button>
                    <button
                        onClick={() => navigate('/events')}
                        className="flex-1 bg-[#f84464] text-white py-3 rounded-xl font-bold hover:bg-[#e03a58] transition-colors shadow-lg shadow-[#f84464]/20"
                    >
                        Browse More
                    </button>
                </div>
            </div>
        </div>
    );
};

const EventBooking = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [selectedTicket, setSelectedTicket] = useState('GA');
    const [quantity, setQuantity] = useState(1);
    const [confirmed, setConfirmed] = useState(false);
    const [isBooking, setIsBooking] = useState(false);

    const { data: event, isLoading } = useQuery({
        queryKey: ['event', id],
        queryFn: async () => {
            const res = await getEventById(id);
            return res.data;
        },
        enabled: !!id,
        staleTime: 0,      // always re-fetch — ticket counts must be live
        gcTime: 0,         // don't keep in cache after component unmounts
    });

    // Build TICKET_TYPES dynamically from the event's stored prices
    const TICKET_TYPES = TICKET_ORDER.map(key => ({
        key,
        ...TICKET_META[key],
        price: event?.tickets?.[key]?.price ?? 0,
    }));

    const chosen = TICKET_TYPES.find(t => t.key === selectedTicket);
    const totalAmount = chosen ? chosen.price * quantity : 0;

    const handleBook = async () => {
        if (!user) {
            toast.error('Please sign in to book tickets');
            navigate('/login');
            return;
        }

        setIsBooking(true);
        try {
            const res = await bookEventTicket({
                eventId: id,
                ticketType: selectedTicket,
                quantity,
                totalAmount,
            });

            if (res.data?.order) {
                setConfirmed(true);
            } else {
                toast.error('Booking failed. Please try again.');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Booking failed');
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#f84464] border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center text-gray-500">Event not found.</div>
    );

    if (confirmed) return (
        <ConfirmationScreen
            event={event}
            selectedTicket={selectedTicket}
            quantity={quantity}
            totalAmount={totalAmount + quantity * 30}
        />
    );

    const availableTickets = event.tickets?.[selectedTicket]?.available ?? 0;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                    src={event.posterUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <button
                    onClick={() => navigate('/events')}
                    className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-white/30 transition-all"
                >
                    Back
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-3 ${event.type === 'Music' ? 'bg-purple-500' : 'bg-yellow-400 text-gray-900'
                        }`}>
                        {event.type}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-black leading-tight mb-1">{event.title}</h1>
                    <p className="text-gray-300 text-sm">{event.performers?.join(', ')}</p>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Event Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-black text-gray-900 mb-4">Event Details</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-1">Date</p>
                                <p className="text-gray-800 font-semibold">{dayjs(event.date).format('ddd, D MMM YYYY')}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-1">Time</p>
                                <p className="text-gray-800 font-semibold">{event.time}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-1">Venue</p>
                                <p className="text-gray-800 font-semibold">{event.venue}</p>
                                <p className="text-gray-500 text-xs">{event.city}, {event.state}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-4 leading-relaxed border-t border-gray-100 pt-4">{event.description}</p>
                    </div>

                    {/* Ticket type */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-lg font-black text-gray-900 mb-4">Select Ticket Type</h2>
                        <div className="space-y-3">
                            {TICKET_TYPES.map(ticket => (
                                <div
                                    key={ticket.key}
                                    onClick={() => setSelectedTicket(ticket.key)}
                                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTicket === ticket.key
                                        ? 'border-[#f84464] bg-red-50'
                                        : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${ticket.color} flex items-center justify-center text-lg shadow-md`}>
                                            {ticket.emoji}
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900">{ticket.label}</p>
                                            <p className="text-gray-500 text-xs">{ticket.desc}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-gray-900">₹{ticket.price.toLocaleString()}</p>
                                        <p className="text-xs text-gray-400">/ ticket</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Booking Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                        <h2 className="text-lg font-black text-gray-900 mb-4">Order Summary</h2>

                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <p className="text-sm font-bold text-gray-700">{event.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{event.type} · {event.city}</p>
                            <p className="text-xs text-gray-400 mt-1">{event.time}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm font-bold text-gray-700 mb-1">
                                Ticket: <span className="text-[#f84464]">{chosen?.label} {chosen?.emoji}</span>
                            </p>
                            <p className="text-xs text-gray-400 mb-3">{availableTickets} tickets available</p>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="w-9 h-9 rounded-full border-2 border-gray-200 font-black text-gray-600 hover:border-[#f84464] hover:text-[#f84464] transition-colors flex items-center justify-center"
                                >-</button>
                                <span className="font-black text-xl text-gray-900 w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(q => Math.min(q + 1, Math.min(10, availableTickets)))}
                                    className="w-9 h-9 rounded-full border-2 border-gray-200 font-black text-gray-600 hover:border-[#f84464] hover:text-[#f84464] transition-colors flex items-center justify-center"
                                >+</button>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mb-5">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">{quantity} × ₹{chosen?.price?.toLocaleString()}</span>
                                <span className="text-gray-700 font-bold">₹{(chosen?.price * quantity).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Convenience Fee</span>
                                <span className="text-gray-700 font-bold">₹{(quantity * 30).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-black text-base mt-3 pt-3 border-t border-gray-100">
                                <span>Total</span>
                                <span className="text-[#f84464]">₹{(totalAmount + quantity * 30).toLocaleString()}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleBook}
                            disabled={availableTickets === 0 || isBooking}
                            className="w-full bg-[#f84464] hover:bg-[#e03a58] disabled:bg-gray-300 text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-[#f84464]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {isBooking ? (
                                <><div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></div> Booking...</>
                            ) : availableTickets === 0 ? 'Sold Out' : 'Confirm Booking'}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-3">Instant confirmation · No hidden fees</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventBooking;
