import MovieCard from '../components/MovieCard';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function Watchlist() {
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);

  const toggleWatchlist = (movie) => {
    if (watchlist.some(m => m.id === movie.id)) {
      setWatchlist(watchlist.filter(m => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
        {watchlist.length === 0 ? (
          <div className="text-center py-10">Your watchlist is empty.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {watchlist.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}