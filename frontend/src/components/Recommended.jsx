import React from 'react'
import { movies } from '../utils/constants'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getRecommendedMovies } from "../apis";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "../context/locationcontext"


const Recommended = () => {


  const navigate = useNavigate();
  const { location } = useLocation();
  const handleNavigate = (movie) => {
    const originalTitle = movie.title;

    const cleanedTitle = originalTitle.includes(":")
      ? originalTitle.replace(/:/g, "")
      : originalTitle;

    const formattedTitle = cleanedTitle
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(`/movies/${location}/${formattedTitle}/${movie._id}/ticket`);
  };
  // API CALL
  const { data: recMovies, isLoading, isError } = useQuery({
    queryKey: ["recommendedMovies"],
    queryFn: async () => {
      const response = await getRecommendedMovies();
      return response.data; // Return just the body data for easier access
    },
    placeholderData: keepPreviousData
  });

  if (isLoading) {
    return (
      <div className='w-full py-6 bg-white min-h-[400px] flex items-center justify-center'>
        <div className='text-gray-500 animate-pulse'>Loading recommended movies...</div>
      </div>
    );
  }

  if (isError || !recMovies?.topMovies) {
    return (
      <div className='w-full py-6 bg-white'>
        <div className='max-w-screen-xl mx-auto px-4 text-red-500'>
          Failed to load recommended movies.
        </div>
      </div>
    );
  }

  return (
    <div className='w-full py-6 bg-white'>
      <div className='max-w-screen-xl mx-auto px-4'>

        {/* Header */}
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-xl font-semibold'>Recommended Movies</h2>
          <span
            onClick={() => navigate("/movies")}
            className='text-md text-red-500 font-semibold cursor-pointer hover:underline'
          >
            See All
          </span>
        </div>

        {/* Movie Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
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
                <h3 className='text-lg font-semibold leading-tight'>
                  {movie.title}
                </h3>
                <p className='text-sm text-gray-600'>
                  {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
                </p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default Recommended
