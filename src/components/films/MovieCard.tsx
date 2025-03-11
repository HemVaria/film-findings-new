
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, FilmIcon, PlayCircle, Plus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Movie } from '@/types/movie';
import { useWatchlist } from '@/hooks/use-watchlist';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();
  
  const isMovieInWatchlist = isInWatchlist(movie.imdbID);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (isMovieInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const renderPoster = () => {
    if (movie.Poster && movie.Poster !== 'N/A') {
      return (
        <>
          {isLoading && (
            <div className="absolute inset-0 bg-film-dark-purple animate-pulse" />
          )}
          <img
            src={movie.Poster}
            alt={movie.Title}
            className={`object-cover w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      );
    } else {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-film-dark-purple/50">
          <FilmIcon className="w-16 h-16 text-white/30" />
        </div>
      );
    }
  };

  return (
    <div className={cn("group relative", className)}>
      <Link
        to={`/movie/${movie.imdbID}`}
        className="block relative rounded-lg overflow-hidden aspect-[2/3] shadow-lg bg-film-dark-purple/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-full">
          {renderPoster()}
          
          {/* Hover overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end`}
          >
            <h3 className="text-white font-medium line-clamp-2">{movie.Title}</h3>
            <p className="text-white/70 text-sm mt-1">{movie.Year}</p>
            
            <div className="flex space-x-2 mt-3">
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full transition-colors duration-300 
                ${isFavorite ? 'bg-film-pink text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className="w-4 h-4" />
              </button>
              
              <button 
                onClick={toggleWatchlist}
                className={`p-2 rounded-full transition-colors duration-300 
                ${isMovieInWatchlist 
                  ? 'bg-film-purple text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                aria-label={isMovieInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              >
                {isMovieInWatchlist ? <Check className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </button>
              
              <button 
                className="flex-1 flex items-center justify-center bg-film-purple/20 hover:bg-film-purple/30 text-film-light-purple
                rounded-full text-xs font-medium transition-colors duration-300"
              >
                <PlayCircle className="w-3 h-3 mr-1" /> 
                Watch now
              </button>
            </div>
          </div>
          
          {/* Top right actions (visible on mobile without hover) */}
          <div className="absolute top-2 right-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex space-x-1">
            <button 
              onClick={toggleFavorite}
              className={`p-1.5 rounded-full bg-black/60 backdrop-blur-sm 
              ${isFavorite ? 'text-film-pink' : 'text-white/80'}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className="w-3.5 h-3.5" />
            </button>
            
            <button 
              onClick={toggleWatchlist}
              className={`p-1.5 rounded-full bg-black/60 backdrop-blur-sm 
              ${isMovieInWatchlist ? 'text-film-purple' : 'text-white/80'}`}
              aria-label={isMovieInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {isMovieInWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </Link>
      
      {/* Title below the card (for non-hover states) */}
      <div className="mt-2 md:group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white font-medium line-clamp-1">{movie.Title}</h3>
        <p className="text-white/60 text-sm">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
