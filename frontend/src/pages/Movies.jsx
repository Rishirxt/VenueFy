import React from 'react'
import Banner from '../components/shared/Banner'
import MovieFilters from '../components/movies/MovieFilters'
import MovieList from '../components/movies/MovieList'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getAllMovies } from '../apis/index';
import { toast } from 'react-hot-toast';

const Movies = () => {
  const { data: allMovies, isLoading, isError } = useQuery({
    queryKey: ["allMovies"],
    queryFn: async () => {
      return await getAllMovies();
    },
    placeholderData: keepPreviousData,
    select: (res) => res.data.movies
  });

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
  console.log('Movies page rendered');
  return (
    <div>
      <Banner />
      <div className='flex flex-col md:flex-row bg-[#f5f5f5] min-h-screen
        md:px-[100px] pb-10 pt-8'>
        <MovieFilters />
        <MovieList allMovies={allMovies} />
      </div>
    </div>
  )
}

export default Movies