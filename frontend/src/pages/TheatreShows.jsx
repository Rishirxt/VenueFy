import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllShows } from '../apis';
import { useLocation as useGlobalLocation } from '../context/locationcontext';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const TheatreShows = () => {
    const { location } = useGlobalLocation();
    const navigate = useNavigate();

    const { data: shows, isLoading, error } = useQuery({
        queryKey: ['allShows', location],
        queryFn: async () => {
            const response = await getAllShows(location);
            return response.data;
        },
        enabled: !!location,
    });

    if (isLoading) return <div className="text-center py-10 mt-20 font-semibold text-lg">Loading Theatre Shows...</div>;
    if (error) return <div className="text-center py-10 mt-20 text-red-500 font-semibold text-lg">Error loading shows. Please try again.</div>;

    const hasShows = shows && shows.length > 0;

    return (
        <div className="bg-gray-50 min-h-screen pt-8 pb-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b-4 border-[#f84464] pb-2 inline-block">Theatre Shows in {location}</h1>
                </div>

                {!hasShows ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">🎭</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Shows Available</h2>
                        <p className="text-gray-500 text-lg max-w-md">There are currently no theatre shows scheduled in your selected location.</p>
                        <button
                            onClick={() => navigate('/movies')}
                            className="mt-8 bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md"
                        >
                            Explore Movies Instead
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {shows.map((show) => {
                            const posterUrl = show.movie?.posterUrl || show.movie?.posterURL || show.movie?.img || "https://images.unsplash.com/photo-1507676184212-d0330a15233c?q=80&w=800&auto=format&fit=crop";

                            return (
                                <div key={show._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group transform hover:-translate-y-1">
                                    <div className="h-64 overflow-hidden relative">
                                        <img
                                            src={posterUrl}
                                            alt={show.movie?.title || 'Unknown Event'}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWPY//8/AAX4Av7bjQ0TAAAAAElFTkSuQmCC";
                                            }}
                                        />
                                        <div className="absolute top-3 left-3 bg-[#f84464] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded shadow-md">
                                            Theatre
                                        </div>
                                        {show.format && (
                                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded shadow-md border border-white/20">
                                                {show.format}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="font-bold text-xl mb-1 line-clamp-1 truncate drop-shadow-md">{show.movie?.title || 'Live Performance'}</h3>
                                            <p className="text-sm font-medium flex items-center text-gray-200">
                                                <span className="truncate drop-shadow-md">{show.theater?.name || 'Local Venue'}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-grow flex flex-col bg-white z-10">
                                        <div className="flex gap-4 mb-5 text-sm">
                                            <div className="bg-gray-50 rounded-lg p-3 flex-1 border border-gray-100 flex flex-col items-center justify-center">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Date</span>
                                                <span className="text-gray-900 font-bold">{dayjs(show.date).format("MMM D")}</span>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 flex-1 border border-gray-100 flex flex-col items-center justify-center">
                                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Time</span>
                                                <span className="text-gray-900 font-bold">{show.startTime}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <button
                                                onClick={() => navigate(`/shows/${show._id}/seat-layout`)}
                                                className="w-full bg-[#f84464] hover:bg-[#e03a58] text-white py-3.5 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg shadow-[#f84464]/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <span>Book Tickets</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TheatreShows;
