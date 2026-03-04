import React, { useState, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Banner from '../components/shared/Banner'
import MovieFilters from '../components/movies/MovieFilters'
import MovieList from '../components/movies/MovieList'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllMovies, getEvents } from '../apis/index';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(routerLocation.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const [selectedFilters, setSelectedFilters] = useState({
    languages: [],
    genres: [],
    formats: []
  });

  const { data: allMovies, isLoading, isError } = useQuery({
    queryKey: ["allMovies"],
    queryFn: async () => {
      return await getAllMovies();
    },
    placeholderData: keepPreviousData,
    select: (res) => res.data.movies
  });

  const filteredMovies = useMemo(() => {
    if (!allMovies) return [];

    return allMovies.filter(movie => {
      // Search filter
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery);

      // Language filter
      const matchesLanguage = selectedFilters.languages.length === 0 ||
        selectedFilters.languages.some(lang => movie.languages?.includes(lang) || (Array.isArray(movie.languages) && movie.languages.includes(lang)));

      // Genre filter
      const matchesGenre = selectedFilters.genres.length === 0 ||
        selectedFilters.genres.some(genre => movie.genre?.includes(genre) || (Array.isArray(movie.genre) && movie.genre.includes(genre)));

      // Format filter
      const matchesFormat = selectedFilters.formats.length === 0 ||
        selectedFilters.formats.some(format => movie.format?.includes(format) || (Array.isArray(movie.format) && movie.format.includes(format)));

      return matchesSearch && matchesLanguage && matchesGenre && matchesFormat;
    });
  }, [allMovies, searchQuery, selectedFilters]);

  // Also fetch events when searching
  const { data: eventsData } = useQuery({
    queryKey: ['search-events', searchQuery],
    queryFn: async () => {
      const res = await getEvents();
      return res.data;
    },
    enabled: !!searchQuery,
    staleTime: 60_000,
  });

  const matchingEvents = searchQuery && eventsData
    ? eventsData.reduce((acc, event) => {
      if (
        event.title.toLowerCase().includes(searchQuery) ||
        event.performers?.some(p => p.toLowerCase().includes(searchQuery)) ||
        event.type.toLowerCase().includes(searchQuery)
      ) {
        // dedup by title
        if (!acc.find(e => e.title === event.title)) acc.push(event);
      }
      return acc;
    }, [])
    : [];

  const handleFilterChange = (type, value) => {
    setSelectedFilters(prev => ({ ...prev, [type]: value }));
  };

  const handleClear = (type) => {
    setSelectedFilters(prev => ({ ...prev, [type]: [] }));
  };

  if (isError) {
    toast.error("Something went wrong!");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-500 text-lg">Loading movies...</div>
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <div className='flex flex-col md:flex-row bg-[#f5f5f5] min-h-screen md:px-[100px] pb-10 pt-8'>
        <MovieFilters
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClear={handleClear}
        />
        <div className='w-full md:w-3/4'>
          <MovieList allMovies={filteredMovies} />
          {/* Show matching events below movies when searching */}
          {matchingEvents.length > 0 && (
            <div className='p-4 mt-2'>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                Events matching "{searchParams.get('search')}"
              </h3>
              <div className='flex flex-wrap gap-6'>
                {matchingEvents.map(event => (
                  <div
                    key={event._id}
                    onClick={() => navigate(`/events/${event._id}`)}
                    className='w-40 cursor-pointer hover:scale-[1.03] transition-transform duration-200'
                  >
                    <img
                      src={event.posterUrl}
                      alt={event.title}
                      className='w-full h-56 object-cover rounded'
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400'; }}
                    />
                    <div className='bg-black text-white text-xs px-2 py-1 flex items-center justify-between'>
                      <span>{event.type}</span>
                      <span className='text-[#f84464] font-bold'>From ₹{event.tickets?.GA?.price?.toLocaleString()}</span>
                    </div>
                    <div className='px-1 py-1'>
                      <p className='text-sm font-semibold leading-tight line-clamp-2'>{event.title}</p>
                      <p className='text-xs text-gray-500'>{event.city}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Movies