import { useState } from 'react';
import { useMovies } from "../hooks/useMovies";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useLocalStorage } from "../hooks/useLocalStorage";import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect } from 'react';


const Home = () => {
  const [query, setQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useLocalStorage('watchlist', []);
  
  const { movies, loading, error, totalPages, genres, loadMovies } = useMovies(
    query,
    selectedGenres
  );
    useEffect(() => {
        loadMovies(1, true);
      }, []);


  const toggleWatchlist = (movie) => {
    if (watchlist.some(m => m.id === movie.id)) {
      setWatchlist(watchlist.filter(m => m.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    loadMovies(1, true);
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMovies(nextPage);
    }
  };

  useInfiniteScroll(loadMore, page < totalPages && !loading);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold">
            {query ? `Search: ${query}` : 'Popular Movies'}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
            <GenreFilter
              genres={genres}
              selectedGenres={selectedGenres}
              onGenreChange={setSelectedGenres}
            />
          </div>
        </div>
        
        {error && <div className="text-red-500 text-center py-4">{error}</div>}
        
        {movies.length === 0 && !loading ? (
          <div className="text-center py-10">
            {query ? 'No movies found. Try a different search.' : 'Loading movies...'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
              />
            ))}
          </div>
        )}
        
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Home;