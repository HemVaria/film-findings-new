
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Movie } from '@/types/movie';
import { toast } from 'sonner';

export interface WatchlistItem {
  id: string;
  movie_id: string;
  movie_title: string;
  movie_poster: string | null;
  added_at: string;
}

export function useWatchlist() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);

  const fetchWatchlist = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('watchlists')
        .select('*')
        .order('added_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setWatchlistItems(data || []);
    } catch (error: any) {
      console.error('Error fetching watchlist:', error.message);
      toast.error('Failed to load watchlist');
    } finally {
      setIsLoading(false);
    }
  };

  const addToWatchlist = async (movie: Movie) => {
    if (!user) {
      toast.error('You need to be logged in to add to your watchlist');
      return false;
    }

    try {
      const { error } = await supabase.from('watchlists').insert({
        user_id: user.id,
        movie_id: movie.imdbID,
        movie_title: movie.Title,
        movie_poster: movie.Poster !== 'N/A' ? movie.Poster : null
      });

      if (error) {
        if (error.code === '23505') { // Unique violation
          toast.info('This movie is already in your watchlist');
        } else {
          throw error;
        }
        return false;
      }

      toast.success('Added to your watchlist');
      await fetchWatchlist();
      return true;
    } catch (error: any) {
      console.error('Error adding to watchlist:', error.message);
      toast.error('Failed to add to watchlist');
      return false;
    }
  };

  const removeFromWatchlist = async (movieId: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('watchlists')
        .delete()
        .match({ user_id: user.id, movie_id: movieId });

      if (error) {
        throw error;
      }

      toast.success('Removed from your watchlist');
      setWatchlistItems(prev => prev.filter(item => item.movie_id !== movieId));
      return true;
    } catch (error: any) {
      console.error('Error removing from watchlist:', error.message);
      toast.error('Failed to remove from watchlist');
      return false;
    }
  };

  const isInWatchlist = (movieId: string): boolean => {
    return watchlistItems.some(item => item.movie_id === movieId);
  };

  return {
    watchlistItems,
    isLoading,
    fetchWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist
  };
}
