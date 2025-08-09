import MovieDetails from '../components/MovieDetails';
import { useLocalStorage } from '../hooks/useLocalStorage';
const MoviePage = () => {
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
      <MovieDetails watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </div>
  );
};

export default MoviePage;