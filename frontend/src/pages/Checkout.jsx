import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Header from "../components/seat-layout/Header";
import { useAuth } from '../context/AuthContext.jsx';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, placeOrder } = useAuth();
    const { selectedSeats, showData } = state || {};
    const [isBooking, setIsBooking] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [bookingError, setBookingError] = React.useState('');

    if (!showData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-gray-500">No booking information found.</p>
                <button onClick={() => navigate("/")} className="text-blue-500 underline">Go Home</button>
            </div>
        );
    }

    const orderAmount = selectedSeats.reduce((sum, s) => sum + s.price, 0);
    const taxesAndFees = Math.round(orderAmount * 0.15); // Simple calculation
    const totalToPay = orderAmount + taxesAndFees;

    const formatDate = (dateStr) => {
        let d = dayjs(dateStr, "DD-MM-YYYY", true);
        if (!d.isValid()) d = dayjs(dateStr, "DD-MM-YY", true);
        return d;
    };

    const displayDate = formatDate(showData.date);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setIsBooking(true);
        setBookingError('');

        const orderData = {
            showId: showData._id,
            movieTitle: showData.movie.title,
            moviePoster: showData.movie.posterUrl,
            cinemaName: showData.theater.name,
            showTime: showData.startTime,
            seats: selectedSeats.map(s => `${s.row}-${s.number}`),
            quantity: selectedSeats.length,
            totalAmount: totalToPay,
            bookingTime: new Date()
        };

        const result = await placeOrder(orderData);
        setIsBooking(false);

        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 3000);
        } else {
            setBookingError(result.error);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">Ticket Purchased!</h1>
                <p className="text-gray-500 mb-8 max-w-xs">Your seats have been booked successfully. Redirecting you to your orders...</p>
                <button
                    onClick={() => navigate('/profile')}
                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all"
                >
                    View My Orders
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Header */}
            <Header showData={showData} type="checkout" />

            <main className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="flex-grow lg:w-2/3">
                    <h1 className="text-2xl font-bold mb-6">Review your booking</h1>

                    {/* Movie Info Card */}
                    <div className="flex gap-6 mb-8">
                        <img
                            src={showData.movie.posterUrl}
                            alt={showData.movie.title}
                            className="w-32 h-44 object-cover rounded shadow-sm"
                        />
                        <div className="flex flex-col justify-center">
                            <h2 className="text-xl font-bold mb-2 uppercase tracking-tight">{showData.movie.title}</h2>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className="text-[10px] px-2 py-0.5 border border-gray-300 text-gray-500 font-bold rounded uppercase">UA13+</span>
                                <span className="text-[10px] px-2 py-0.5 border border-gray-300 text-gray-500 font-bold rounded uppercase">{showData.movie.language || 'English'}</span>
                                <span className="text-[10px] px-2 py-0.5 border border-gray-300 text-gray-500 font-bold rounded uppercase">{showData.format}</span>
                            </div>
                            <p className="text-sm text-gray-600 font-medium">
                                {showData.theater.name}, {showData.theater.city}, {showData.theater.state}
                            </p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm mb-6">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Show Details</span>
                                <span className="text-lg font-bold">{displayDate.format("D MMMM • hh:mm A")}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">{selectedSeats.length} Tickets</span>
                                <span className="text-sm font-bold text-gray-700">
                                    {selectedSeats.map(s => `${s.row}-${s.number}`).join(', ')}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 py-4 border-t border-gray-50">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-800 uppercase">TIER SUMMARY</span>
                                <span className="text-xs text-gray-500">₹{orderAmount} • BOOKING FEE INCL.</span>
                            </div>
                        </div>
                    </div>

                    {/* Alert Box */}
                    {bookingError && (
                        <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4 flex items-start gap-4">
                            <p className="text-sm text-red-700 font-medium">{bookingError}</p>
                        </div>
                    )}
                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8 flex items-start gap-4">
                        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-sm text-yellow-700 font-medium">No cancellation or refund available after payment.</p>
                    </div>

                    {/* Offers */}
                    <div className="py-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold uppercase text-xs tracking-widest text-gray-400">Available Offers</h3>
                            <button className="text-[#f84464] text-xs font-bold hover:underline">View all offers</button>
                        </div>
                        <div className="border border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center gap-2 bg-gray-50">
                            {user ? (
                                <p className="text-sm text-gray-500 italic">No offers available for this booking at the moment.</p>
                            ) : (
                                <p className="text-sm text-gray-500">Login to see available offers</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column / Sidebar */}
                <div className="lg:w-1/3">
                    <div className="sticky top-24 space-y-6">
                        {/* Payment Summary */}
                        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Order Summary</h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Order amount</span>
                                    <span className="font-medium text-gray-800">₹{orderAmount}.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 text-xs">Taxes & fees (18%)</span>
                                    <span className="font-medium text-gray-800">₹{taxesAndFees}.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-800 uppercase">To be paid</span>
                                    </div>
                                    <span className="text-2xl font-black text-gray-900 leading-none">₹{totalToPay}.00</span>
                                </div>
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Sharing Details</h3>
                            <div className="flex flex-col">
                                {user ? (
                                    <>
                                        <span className="text-sm font-bold text-gray-800 uppercase">{user.name}</span>
                                        <span className="text-xs text-gray-500">{user.phone} • {user.email}</span>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => navigate('/login')}
                                        className="text-sm font-bold text-[#f84464] hover:underline text-left uppercase"
                                    >
                                        Sign in to share details
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors underline decoration-gray-200">
                                Terms and conditions
                            </button>
                        </div>

                        {/* Final CTA */}
                        <button
                            onClick={handleBooking}
                            disabled={isBooking}
                            className={`w-full bg-[#1a1a1a] text-white flex items-center justify-between px-8 py-5 rounded-xl font-bold transition-all duration-300 ${isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:scale-[1.02]'}`}
                        >
                            <div className="flex flex-col items-start border-r border-white/20 pr-6">
                                <span className="text-lg leading-none">₹{totalToPay}.00</span>
                                <span className="text-[10px] uppercase tracking-widest opacity-60">TOTAL</span>
                            </div>
                            <span className="text-lg tracking-widest">{isBooking ? 'PROCESSING...' : 'PROCEED TO PAY'}</span>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;