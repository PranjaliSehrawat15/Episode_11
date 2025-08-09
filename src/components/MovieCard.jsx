import { Link } from 'react-router-dom';
import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { StarIcon } from '@heroicons/react/24/outline';

const MovieCard = ({ movie, watchlist, toggleWatchlist }) => {
  const isInWatchlist = watchlist.some(m => m.id === movie.id);
  
  return (
    <div className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/placeholder-poster.jpg'
          }
          alt={movie.title}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="text-white font-semibold truncate">{movie.title}</h3>
          <div className="flex items-center mt-1">
            <StarIcon className="h-5 w-5 text-yellow-400" />
            <span className="text-gray-300 ml-1">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWatchlist(movie);
        }}
        className="absolute top-2 right-2 p-2 bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      >
        {isInWatchlist ? (
          <BookmarkSolid className="h-5 w-5 text-yellow-400" />
        ) : (
          <BookmarkOutline className="h-5 w-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default MovieCard;