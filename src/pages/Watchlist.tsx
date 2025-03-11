
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWatchlist } from '@/hooks/use-watchlist';
import MovieCard from '@/components/films/MovieCard';
import { Clock, Film, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';

const Watchlist = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { watchlistItems, isLoading, fetchWatchlist } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user) {
      fetchWatchlist();
    }
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-film-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <LogIn className="h-12 w-12 mx-auto mb-4 text-film-light-purple" />
          <h2 className="text-2xl font-bold text-white mb-4">Sign in to view your watchlist</h2>
          <p className="text-white/70 mb-6">
            Create an account or sign in to keep track of movies you want to watch.
          </p>
          <Button onClick={() => navigate('/auth')} className="premium-button px-6 py-3 rounded-full">
            Sign In / Sign Up
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-film-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (watchlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <Clock className="h-12 w-12 mx-auto mb-4 text-film-light-purple" />
          <h2 className="text-2xl font-bold text-white mb-4">Your watchlist is empty</h2>
          <p className="text-white/70 mb-6">
            Add movies to your watchlist to keep track of what you want to watch later.
          </p>
          <Button onClick={() => navigate('/')} className="premium-button px-6 py-3 rounded-full">
            Browse Movies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white">Your Watchlist</h1>
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <Clock className="w-4 h-4" />
          <span>{watchlistItems.length} {watchlistItems.length === 1 ? 'movie' : 'movies'}</span>
        </div>
      </div>

      {watchlistItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {watchlistItems.map((item) => {
            // Convert WatchlistItem to Movie type for MovieCard
            const movie: Movie = {
              imdbID: item.movie_id,
              Title: item.movie_title,
              Poster: item.movie_poster || 'N/A',
              Year: '',
              Type: 'movie'
            };
            
            return (
              <MovieCard key={item.id} movie={movie} />
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <Film className="h-12 w-12 mx-auto mb-4 text-film-light-purple opacity-50" />
          <h2 className="text-xl font-bold text-white mb-2">No movies in your watchlist</h2>
          <p className="text-white/70">Add some movies to keep track of what you want to watch.</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
