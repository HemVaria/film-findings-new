
import { Movie, MovieDetails } from '@/types/movie';

const API_KEY = '969002'; // The API key provided in your requirements
const BASE_URL = 'https://www.omdbapi.com/';

// Helper function to handle API errors
const handleErrors = (response: any) => {
  if (response.Error) {
    throw new Error(response.Error);
  }
  return response;
};

// Search movies by title
export const searchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`);
    const data = await response.json();
    return handleErrors(data).Search || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

// Get movie details by ID
export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    const data = await response.json();
    return handleErrors(data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Search movies by genre
export const getMoviesByGenre = async (genre: string, page = 1): Promise<Movie[]> => {
  try {
    // Since OMDB doesn't provide direct genre filtering, we'll search for the genre
    // and filter results client-side
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(genre)}&type=movie&page=${page}`);
    const data = await response.json();
    return handleErrors(data).Search || [];
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

// Get trending movies (simulated since OMDB doesn't have trending endpoint)
export const getTrendingMovies = async (): Promise<Movie[]> => {
  // We'll simulate trending by searching for recent popular movies
  // The OMDB API doesn't support year ranges in the format y=2020,2023
  // Using a simple search for recent popular terms instead
  const popularQueries = ['2023', 'marvel', 'star wars', 'action'];
  const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
  
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(randomQuery)}&type=movie`);
    const data = await response.json();
    return handleErrors(data).Search || [];
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Search TV shows
export const searchTVShows = async (query: string): Promise<Movie[]> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=series`);
    const data = await response.json();
    return handleErrors(data).Search || [];
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return [];
  }
};
