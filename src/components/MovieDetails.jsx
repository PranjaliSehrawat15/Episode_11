import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/tmdb';
import { StarIcon, PlayIcon, BookmarkIcon as BookmarkOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/24/solid';

const MovieDetails = ({ watchlist, toggleWatchlist }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
        
        // Find the official trailer
        const trailer = data.videos.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadMovie();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!movie) return <div className="text-center py-10">Movie not found</div>;

  const isInWatchlist = watchlist.some(m => m.id === movie.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder-poster.jpg'
            }
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="md:w-2/3">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            <button
              onClick={() => toggleWatchlist(movie)}
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full"
            >
              {isInWatchlist ? (
                <>
                  <BookmarkSolid className="h-5 w-5 text-yellow-400" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <BookmarkOutline className="h-5 w-5" />
                  <span>Watchlist</span>
                </>
              )}
            </button>
          </div>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-400" />
              <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span>{movie.runtime} min</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map(genre => (
              <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {genre.name}
              </span>
            ))}
          </div>
          
          <p className="mt-6 text-gray-300">{movie.overview}</p>
          
          {trailerKey && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PlayIcon className="h-5 w-5" />
                Trailer
              </h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-64 md:h-96 rounded-lg"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title={`${movie.title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          {movie.credits.cast.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 8).map(person => (
                  <div key={person.id} className="bg-gray-800 rounded-lg p-3">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                          : '/placeholder-avatar.jpg'
                      }
                      alt={person.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <h3 className="font-medium">{person.name}</h3>
                    <p className="text-sm text-gray-400">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;