import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMoviesById } from '../apis'
import TheaterTimings from '../components/movies/TheaterTimings'
import { movies } from '../utils/constants'
import { toast } from 'react-hot-toast'

const MovieDetails = () => {
    const { id } = useParams();
    const [selectedFilters, setSelectedFilters] = useState([]);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMoviesById(id)
    });

    const movie = data?.data?.movie;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: movie.title,
                    text: `Check out ${movie.title} on VenueFy!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    const handleRateNow = () => {
        toast.success("Rating submitted! (Mockup)");
    };

    const toggleFilter = (filter) => {
        setSelectedFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    if (isLoading) return <div className="h-screen flex items-center justify-center text-white bg-black">Loading movie details...</div>;
    if (isError || !movie) return <div className="h-screen flex items-center justify-center text-red-500 bg-black">Error loading movie details.</div>;

    const availableFilters = ["2D", "3D", "Wheelchair Friendly", "Premium Seats", "Recliners", "IMAX", "PVR PXL", "4DX", "Laser", "Dolby Atmos"];

    return (
        <>
            {/*Movie Details Page*/}
            <div className='relative text-white font-sans px-4 py-10'
                style={{
                    backgroundImage: `url(${movies.find(h => h.title === movie.title)?.img || movie.posterURL || movie.posterUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                {/*overlay for darkness*/}
                <div className='absolute inset-0 bg-black opacity-70'></div>
                {/*Actual Content*/}
                <div className='relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10'>
                    {/*Poster*/}
                    <div>
                        <img src={movies.find(h => h.title === movie.title)?.img || movie.posterURL || movie.posterUrl} alt={movie.title} className="rounded-xl w-52 shadow-xl" />
                    </div>
                    {/* Details*/}
                    <div className='flex flex-col justify-star flex-1'>
                        <h1 className='text-4xl font-bold mb-4'>{movie.title}</h1>
                        <div className='flex items-center gap-4 mb-3'>
                            <div className='bg-[#3a3a3a] px-4 py-2 rounded-md flex items-center gap-2
                    text-sm'>
                                <span className='text-pink-500 font-bold'>
                                    ⭐ {movie.rating}
                                </span>
                                <span className='text-gray-300'>
                                    {movie.votes} Votes
                                </span>
                                <button
                                    onClick={handleRateNow}
                                    className='cursor-pointer bg-[#2f2f2f] ml-6 px-4 py-2
                        rounded-md hover:bg-[#4a4a4a] transition-colors'>
                                    Rate now
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm mb-4">
                            <span className="bg-[#3a3a3a] px-3 py-1 rounded">
                                {movie.format?.join(", ")}
                            </span>
                            <span className="bg-[#3a3a3a] px-3 py-1 rounded">
                                {movie.languages?.join(", ")}
                            </span>
                        </div>

                        <p className="text-sm text-gray-300 mb-6">
                            {movie.duration} • {movie.genre?.join(", ")} • {" "}
                            {movie.certification || movie.Certification} • {" "}
                            {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : ""}
                        </p>

                        <div>
                            <h2 className="text-xl font-bold mb-2">About the movie</h2>
                            <p className="text-sm text-gray-50 leading-relaxed mb-4">
                                {movie.description}
                            </p>
                        </div>

                    </div>
                    {/* Share buttons */}
                    <div className="absolute top-0 right-0 cursor-pointer">
                        <button
                            onClick={handleShare}
                            className="cursor-pointer bg-[#3a3a3a] px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-[#4a4a4a] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12c-1.66 0-3 1.34-3 3s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1 1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>

            </div>

            {/* Theater Formats and Experience Options */}
            <div className='w-full bg-white px-4 py-8'>
                <div className='max-w-7xl mx-auto'>
                    <div className='flex flex-wrap gap-3 mb-4'>
                        {availableFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => toggleFilter(filter)}
                                className={`px-4 py-2 rounded-md text-sm font-medium border transition-colors ${selectedFilters.includes(filter)
                                        ? 'bg-[#f84464] text-white border-[#f84464]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className='flex items-center gap-6 text-xs text-gray-600'>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                            <span>Available</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-yellow-500 rounded-full'></span>
                            <span>Filling fast</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                            <span>Almost full</span>
                        </div>
                    </div>
                    <TheaterTimings movieId={id} selectedFilters={selectedFilters} />
                </div>

            </div>
        </>
    )
}
export default MovieDetails
