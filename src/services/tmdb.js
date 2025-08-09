import axios from 'axios';

const API_KEY = 'c9a476e05988a7b0c5bf884f3d75412f';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = query
      ? await tmdb.get('/search/movie', { params: { query, page } })
      : await tmdb.get('/movie/popular', { params: { page } });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return { results: [], total_pages: 0 };
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const [movie, credits, videos] = await Promise.all([
      tmdb.get(`/movie/${id}`),
      tmdb.get(`/movie/${id}/credits`),
      tmdb.get(`/movie/${id}/videos`),
    ]);
    
    return {
      ...movie.data,
      credits: credits.data,
      videos: videos.data.results,
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await tmdb.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};