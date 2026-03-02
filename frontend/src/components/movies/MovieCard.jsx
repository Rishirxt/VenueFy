import { useNavigate } from 'react-router-dom';
import { useLocation } from '../../context/locationcontext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { location } = useLocation();

  const handleNavigate = () => {
    const originalTitle = movie.title;
    const cleanedTitle = originalTitle.includes(":")
      ? originalTitle.replace(/:/g, "")
      : originalTitle;

    const formattedTitle = cleanedTitle
      .replace(/\s+/g, "-")
      .toLowerCase();

    navigate(`/movies/${location}/${formattedTitle}/${movie._id}/ticket`);
  };

  return (
    <div className='w-40 md:w-52 cursor-pointer' onClick={handleNavigate}>
      <img
        src={movie.posterUrl || movie.posterURL || movie.img}
        alt={movie.title}
        className='rounded-lg shadow-md w-full h-72 object-cover'
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIHWPY//8/AAX4Av7bjQ0TAAAAAElFTkSuQmCC";
        }}
      />
      <div className='mt-2'>
        <p className='font-medium truncate'>{movie.title}</p>
        <p className='text-xs text-gray-500'>⭐ {movie.rating}/10 | {movie.votes} Votes</p>
        <p className='text-sm text-gray-600 truncate'>
          {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
        </p>
      </div>
    </div>
  )
}

export default MovieCard