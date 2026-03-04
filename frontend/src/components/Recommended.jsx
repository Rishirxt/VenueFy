import React from 'react'
import { movies } from '../utils/constants'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRecommendedMovies, getEvents } from "../apis";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "../context/locationcontext"
import dayjs from 'dayjs';

const Recommended = () => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const handleNavigate = (movie) => {
    const originalTitle = movie.title;
    const cleanedTitle = originalTitle.includes(":")
      ? originalTitle.replace(/:/g, "")
      : originalTitle;
    const formattedTitle = cleanedTitle.replace(/\s+/g, "-").toLowerCase();
    navigate(`/movies/${location}/${formattedTitle}/${movie._id}/ticket`);
  };

  const { data: recMovies, isLoading: moviesLoading } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: async () => {
      const response = await getRecommendedMovies();
      return response.data;
    },
    placeholderData: keepPreviousData
  });

  const { data: eventsData, isLoading: eventsLoading } = useQuery({
    queryKey: ["recommendedEvents", location],
    queryFn: async () => {
      const response = await getEvents(location);
      return response.data;
    },
  });

  // Deduplicate events by title, pick one per unique title (max 5)
  const uniqueEvents = eventsData
    ? eventsData.reduce((acc, event) => {
      if (!acc.find(e => e.title === event.title)) acc.push(event);
      return acc;
    }, []).slice(0, 5)
    : [];

  return (
    <div className='w-full py-6 bg-white'>
      <div className='max-w-screen-xl mx-auto px-4'>

        {/* ── Recommended Movies ── */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Recommended Movies</h2>
          <span
            onClick={() => navigate("/movies")}
            className='text-md text-red-500 font-semibold cursor-pointer hover:underline'
          >
            See All
          </span>
        </div>

        {moviesLoading ? (
          <div className='text-gray-500 animate-pulse py-8 text-center'>Loading recommended movies...</div>
        ) : recMovies?.topMovies ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10'>
            {recMovies.topMovies.map((movie, i) => (
              <div
                key={i} onClick={() => handleNavigate(movie)}
                className='rounded overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform duration-200'
              >
                <div className='relative'>
                  <img
                    src={movies.find(h => h.title === movie.title)?.img || movie.posterUrl || movie.posterURL}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWPY//8/AAX4Av7bjQ0TAAAAAElFTkSuQmCC";
                    }}
                    className='w-full h-[300px] object-cover rounded'
                  />
                </div>
                <div className='bg-black text-white text-sm px-2 py-1 flex items-center justify-between'>
                  <span>⭐ {movie.rating}/10</span>
                  <span>{movie.votes} Votes</span>
                </div>
                <div className='px-1 py-2'>
                  <h3 className='text-lg font-semibold leading-tight'>{movie.title}</h3>
                  <p className='text-sm text-gray-600'>
                    {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* ── Recommended Shows ── */}
        <div className='flex items-center justify-between mb-4 mt-2'>
          <h2 className='text-xl font-semibold'>Recommended Shows</h2>
          <span
            onClick={() => navigate("/events")}
            className='text-md text-red-500 font-semibold cursor-pointer hover:underline'
          >
            See All
          </span>
        </div>

        {eventsLoading ? (
          <div className='text-gray-500 animate-pulse py-8 text-center'>Loading shows...</div>
        ) : uniqueEvents.length > 0 ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {uniqueEvents.map((event) => (
              <div
                key={event._id}
                onClick={() => navigate(`/events/${event._id}`)}
                className='rounded overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform duration-200'
              >
                <div className='relative'>
                  <img
                    src={event.posterUrl}
                    alt={event.title}
                    onError={e => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400"; }}
                    className='w-full h-[300px] object-cover rounded'
                  />
                  <span className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full ${event.type === 'Music' ? 'bg-purple-500 text-white' : 'bg-yellow-400 text-gray-900'
                    }`}>
                    {event.type}
                  </span>
                </div>
                <div className='bg-black text-white text-sm px-2 py-1 flex items-center justify-between'>
                  <span>{event.city}</span>
                  <span className='text-[#f84464] font-bold'>From ₹{event.tickets?.GA?.price?.toLocaleString() ?? '2,000'}</span>
                </div>
                <div className='px-1 py-2'>
                  <h3 className='text-base font-semibold leading-tight line-clamp-1'>{event.title}</h3>
                  <p className='text-sm text-gray-600'>{event.performers?.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-gray-400 py-8 text-center text-sm'>No shows available in {location}.</div>
        )}

      </div>
    </div>
  )
}

export default Recommended
