import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../apis';
import { useLocation } from '../context/locationcontext';
import { useLocation as useRouterLocation, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs'; // used for date display in future

const TYPES = ['All', 'Music', 'Comedy'];

const Events = () => {
    const { location } = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const [activeType, setActiveType] = useState('All');

    const { data: events = [], isLoading } = useQuery({
        queryKey: ['events', location, activeType],
        queryFn: async () => {
            const response = await getEvents(location, activeType === 'All' ? undefined : activeType);
            return response.data;
        },
    });

    // Deduplicate: show only unique event titles per city, then apply search filter
    const uniqueEvents = events
        .reduce((acc, event) => {
            const key = `${event.title}-${event.city}`;
            if (!acc.find(e => `${e.title}-${e.city}` === key)) acc.push(event);
            return acc;
        }, [])
        .filter(event => {
            if (!searchQuery) return true;
            return (
                event.title.toLowerCase().includes(searchQuery) ||
                event.performers?.some(p => p.toLowerCase().includes(searchQuery)) ||
                event.type.toLowerCase().includes(searchQuery)
            );
        });

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-[#f84464] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Loading events...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#1a0533] via-[#2d0a4e] to-[#4a0e7a] text-white py-12 px-4">
                <div className="max-w-screen-xl mx-auto">
                    <h1 className="text-4xl font-black mb-2">Best of Live Events</h1>
                    <p className="text-purple-300 text-lg">Music concerts, comedy nights & more — live in {location || 'your city'}</p>
                </div>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 py-8">
                {/* Type Filter */}
                <div className="flex gap-3 mb-8">
                    {TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeType === type
                                ? 'bg-[#f84464] text-white shadow-lg shadow-[#f84464]/30'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#f84464] hover:text-[#f84464]'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {uniqueEvents.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🎭</p>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No events found</h2>
                        <p className="text-gray-500">Try changing your city or browsing a different category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {uniqueEvents.map(event => (
                            <div
                                key={event._id}
                                onClick={() => navigate(`/events/${event._id}`)}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    <img
                                        src={event.posterUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                    <span className={`absolute top-3 left-3 text-xs font-black px-3 py-1 rounded-full ${event.type === 'Music' ? 'bg-purple-500 text-white' : 'bg-yellow-400 text-gray-900'
                                        }`}>
                                        {event.type}
                                    </span>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 mb-2">{event.title}</h3>
                                    <p className="text-gray-500 text-sm mb-1">{event.venue}</p>
                                    <p className="text-gray-500 text-sm mb-3">{event.city}</p>

                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-gray-400 font-medium">
                                            From <span className="text-[#f84464] font-black text-sm">₹{event.tickets?.GA?.price?.toLocaleString() ?? '—'}</span>
                                        </div>
                                        <button className="bg-[#f84464] text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-[#e03a58] transition-colors">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
