import React from 'react'
import { events } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const LiveEvents = () => {
    const navigate = useNavigate();

    // Only show Music, Comedy, Theatre, Sports categories
    const filteredEvents = events.filter(e =>
        !["AMUSEMENT PARK", "KIDS", "ADVENTURE & FUN"].includes(e.title.toUpperCase())
    );

    return (
        <div className='max-w-screen-xl mx-auto px-4 py-10'>
            <div className="flex items-center justify-between mb-6">
                <h2 className='text-2xl font-semibold'>The Best of Live Events</h2>
                <button
                    onClick={() => navigate('/events')}
                    className="text-sm font-bold text-[#f84464] hover:underline"
                >
                    Browse All Events →
                </button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {filteredEvents.map((event, i) => (
                    <div
                        key={i}
                        onClick={() => navigate('/events')}
                        className='rounded-xl overflow-hidden relative group shadow-sm cursor-pointer'
                    >
                        <img
                            src={event.img}
                            alt={event.title}
                            className='w-full h-56 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105'
                        />
                        <div className='p-2 bg-white'>
                            <h3 className='font-semibold text-sm truncate'>{event.title}</h3>
                            <p className='text-xs text-gray-500'>{event.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LiveEvents;