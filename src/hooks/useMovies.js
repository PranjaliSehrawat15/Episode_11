import { useState, useEffect } from 'react';
import { fetchMovies, fetchGenres } from '../services/tmdb';

export const useMovies = (query, selectedGenres = []) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const loadGenres = async () => {
      const genres = await fetchGenres();
      setGenres(genres);
    };
    loadGenres();
  }, []);

  const loadMovies = async (page = 1, reset = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchMovies(query, page);
      
      if (reset) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = selectedGenres.length > 0
  ? movies.filter(movie =>
      movie.genre_ids.some(id => selectedGenres.includes(id))
    )
  : movies;
    
  return {
    movies: filteredMovies,
    loading,
    error,
    totalPages,
    genres,
    loadMovies,
  
  };
};