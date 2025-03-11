
import React, { useState, useEffect } from 'react';
import Hero from '@/components/layout/Hero';
import MovieCard from '@/components/films/MovieCard';
import GenreFilter from '@/components/films/GenreFilter';
import { getTrendingMovies, getMoviesByGenre } from '@/services/omdbApi';
import { Movie } from '@/types/movie';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [genreMovies, setGenreMovies] = useState<Movie[]>([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isGenreLoading, setIsGenreLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('Action');

  const genres = [
    'Action', 'Comedy', 'Drama', 'Thriller', 'Horror', 
    'Romance', 'Sci-Fi', 'Fantasy', 'Animation', 'Adventure'
  ];

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsTrendingLoading(true);
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
      setIsTrendingLoading(false);
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      setIsGenreLoading(true);
      const movies = await getMoviesByGenre(selectedGenre);
      setGenreMovies(movies);
      setIsGenreLoading(false);
    };

    fetchGenreMovies();
  }, [selectedGenre]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
  };

  const renderMovieGrid = (movies: Movie[], isLoading: boolean) => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-film-purple animate-spin" />
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className="py-20 text-center">
          <p className="text-white/70">No movies found.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-film-darker-blue">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Trending Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now</h2>
            <Link 
              to="/trending" 
              className="flex items-center text-sm font-medium text-film-light-purple hover:text-film-purple transition-colors"
            >
              See all <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {renderMovieGrid(trendingMovies, isTrendingLoading)}
        </section>

        {/* Genre Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Browse by Genre</h2>
            <GenreFilter 
              genres={genres} 
              activeGenre={selectedGenre} 
              onGenreChange={handleGenreChange}
              className="md:w-auto w-full"
            />
          </div>

          {renderMovieGrid(genreMovies, isGenreLoading)}
        </section>
      </div>
    </div>
  );
};

export default Index;
