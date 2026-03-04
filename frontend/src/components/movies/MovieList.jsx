import React, { useState } from 'react'
import { movies as staticMovies } from '../../utils/constants'
import MovieCard from './MovieCard'

const MovieList = ({ allMovies }) => {
    const [showUpcoming, setShowUpcoming] = useState(false);

    const moviesToDisplay = showUpcoming ? staticMovies : allMovies;

    return (
        <div className='w-full md:w-3/4 p-4'>
            <div className='flex justify-between items-center bg-white px-6 py-6 rounded mb-6'>
                <h3 className='text-xl font-semibold text-gray-800'>{showUpcoming ? "Upcoming Movies" : "In Theatres"}</h3>
                <button
                    onClick={() => setShowUpcoming(!showUpcoming)}
                    className='text-[#f74362] hover:underline text-sm cursor-pointer'
                >
                    {showUpcoming ? "← Back to In Theatres" : "Explore Upcoming Movies →"}
                </button>
            </div>
            <div className='flex flex-wrap gap-6'>
                {
                    moviesToDisplay?.map((movie, i) => (
                        <MovieCard key={i} movie={movie} />
                    ))

                }
            </div>
        </div>
    )
}

export default MovieList