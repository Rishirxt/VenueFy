import React, { useEffect, useState } from 'react'
import { MdChair } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const BookingHistory = () => {
    const { fetchMyOrders } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadOrders = async () => {
            const result = await fetchMyOrders();
            if (result.success) {
                setOrders(result.orders);
            }
            setLoading(false);
        };
        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#f84464] rounded-full animate-spin"></div>
                <p className="text-gray-400 mt-4 font-medium italic">Loading your history...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="px-6 py-20 rounded-md text-center bg-gray-50/50 border border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
                <p className="text-gray-500 mb-6">You haven't booked anything yet. Ready for a show?</p>
                <Link
                    to="/"
                    className="bg-[#f84464] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    Explore
                </Link>
            </div>
        );
    }

    return (
        <div className='px-6 rounded-md'>
            <h3 className='text-xl font-semibold mb-6'>Booking History</h3>

            {orders.map((order) => {
                const isEvent = order.orderType === 'event';
                const title = isEvent ? order.eventTitle : order.movieTitle;
                const poster = isEvent ? order.eventPoster : order.moviePoster;
                const venue = isEvent ? order.venueName : order.cinemaName;
                const time = isEvent ? `${order.eventDate} · ${order.eventTime}` : order.showTime;
                const seats = !isEvent && Array.isArray(order.seats) ? order.seats.join(', ') : null;

                return (
                    <div key={order._id} className='bg-white p-5 rounded-md mb-4 shadow-sm border border-gray-50 hover:shadow-md transition-shadow'>
                        <div className='flex gap-6'>
                            {/* Poster / Placeholder */}
                            {poster ? (
                                <img
                                    src={poster}
                                    alt={title}
                                    className='w-28 h-40 object-cover rounded-md flex-shrink-0 bg-gray-100'
                                    onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }}
                                />
                            ) : (
                                <div className='w-28 h-40 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center'>
                                    <span className='text-3xl'>{isEvent ? '🎭' : '🎬'}</span>
                                </div>
                            )}

                            <div className='flex-1 flex flex-col justify-between'>
                                <div>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <p className='font-bold text-xl text-gray-900 uppercase tracking-tight'>
                                                {title || 'Unknown'}
                                            </p>
                                            <p className='text-[10px] font-black text-[#f84464] mt-1 uppercase tracking-widest'>
                                                {isEvent ? `${order.ticketType || 'Ticket'} · Live Event` : 'M-Ticket'} • {order.status}
                                            </p>
                                            <p className='text-sm font-bold text-gray-700 mt-4'>{time || 'N/A'}</p>
                                            <p className='text-sm text-gray-500 mt-1 uppercase font-medium'>{venue || ''}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded flex flex-col items-center min-w-[60px]">
                                            <span className="text-[10px] font-black text-gray-400 uppercase">Qty</span>
                                            <span className="text-lg font-black text-gray-800">{order.quantity}</span>
                                        </div>
                                    </div>

                                    {seats && (
                                        <div className='mt-4 text-sm text-gray-700'>
                                            <div className='flex items-center gap-2'>
                                                <MdChair className='text-gray-400' size={18} />
                                                <span className='font-bold text-gray-800'>{seats}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className='mt-6 pt-4 border-t border-gray-50 flex items-end justify-between'>
                                    <div className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>
                                        <div className='mb-1'>ID: <span className='text-gray-600'>{order._id.slice(-8).toUpperCase()}</span></div>
                                        <div>Booked: <span className='text-gray-600'>{new Date(order.bookingTime || order.createdAt).toLocaleDateString()}</span></div>
                                    </div>
                                    <div className='text-right'>
                                        <span className='text-[10px] font-black text-gray-400 uppercase block mb-1'>Total Paid</span>
                                        <div className='font-black text-2xl text-gray-900'>₹{Number(order.totalAmount).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BookingHistory