import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '@/services/omdbApi';
import { MovieDetails as MovieDetailsType } from '@/types/movie';
import { ChevronLeft, Heart, Clock, Star, Info, Calendar, Film, Award, Play, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWatchlist } from '@/hooks/use-watchlist';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  
  const { user } = useAuth();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, fetchWatchlist } = useWatchlist();
  
  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);
  
  const isMovieInWatchlist = movie ? isInWatchlist(movie.imdbID) : false;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const details = await getMovieDetails(id);
        setMovie(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Add logic to save to user's favorites
  };

  const toggleWatchlist = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (!movie) return;
    
    if (isMovieInWatchlist) {
      removeFromWatchlist(movie.imdbID);
    } else {
      addToWatchlist(movie);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-film-darker-blue flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-film-purple border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-film-darker-blue p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white font-medium mb-4">Movie not found</h2>
        <button 
          onClick={handleGoBack}
          className="flex items-center px-4 py-2 bg-film-purple/20 text-film-light-purple rounded-lg"
        >
          <ChevronLeft className="mr-1 w-5 h-5" /> Go back
        </button>
      </div>
    );
  }

  const renderRating = () => {
    const imdbRating = parseFloat(movie.imdbRating);
    if (isNaN(imdbRating)) return null;
    
    return (
      <div className="flex items-center space-x-1">
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        <span className="text-white font-medium">{imdbRating}</span>
        <span className="text-white/60">/10</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-film-darker-blue">
      <button 
        onClick={handleGoBack}
        className="fixed md:absolute top-20 left-4 z-20 p-2 bg-black/50 backdrop-blur-sm rounded-full shadow-lg md:m-6"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <div className="absolute inset-0 bg-film-dark-purple animate-pulse">
          {movie.Poster && movie.Poster !== 'N/A' && (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className={`w-full h-full object-cover object-center transition-opacity duration-500 ${posterLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setPosterLoaded(true)}
            />
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-film-darker-blue/30 via-film-darker-blue/50 to-film-darker-blue"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-film-darker-blue to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto flex flex-col md:flex-row md:items-end">
            <div className="hidden md:block w-64 h-96 rounded-lg overflow-hidden shadow-xl border border-white/10 flex-shrink-0">
              {movie.Poster && movie.Poster !== 'N/A' ? (
                <img 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-film-dark-purple flex items-center justify-center">
                  <Film className="w-16 h-16 text-white/30" />
                </div>
              )}
            </div>
            
            <div className="md:ml-8 mt-auto">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{movie?.Title}</h1>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 mb-4">
                <div className="chip bg-white/10 text-white/90">{movie.Year}</div>
                {movie.Runtime !== 'N/A' && (
                  <div className="chip bg-white/10 text-white/90">{movie.Runtime}</div>
                )}
                {movie.Rated !== 'N/A' && (
                  <div className="chip bg-white/10 text-white/90">{movie.Rated}</div>
                )}
                {renderRating()}
              </div>
              
              <p className="text-white/80 max-w-2xl line-clamp-3 md:line-clamp-none mb-4">{movie?.Plot}</p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="premium-button px-6 py-3 rounded-full flex items-center">
                  <Play className="mr-2 w-5 h-5" /> Watch now
                </button>
                
                <button 
                  onClick={toggleFavorite}
                  className={`px-4 py-3 rounded-full flex items-center gap-2 transition-colors 
                  ${isFavorite 
                    ? 'bg-film-pink text-white' 
                    : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
                >
                  <Heart className="w-5 h-5" />
                  <span>{isFavorite ? 'Favorited' : 'Add to favorites'}</span>
                </button>
                
                <button 
                  onClick={toggleWatchlist}
                  className={`px-4 py-3 rounded-full flex items-center gap-2 transition-colors 
                  ${isMovieInWatchlist 
                    ? 'bg-film-purple text-white' 
                    : 'bg-white/5 text-white/80 hover:bg-white/10'}`}
                >
                  {isMovieInWatchlist ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  <span>{isMovieInWatchlist ? 'In watchlist' : 'Add to watchlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">About the Movie</h2>
            <p className="text-white/70 mb-8">{movie.Plot}</p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Cast & Crew</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {movie.Director !== 'N/A' && (
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="text-white/50 text-sm mb-1">Director</h4>
                    <p className="text-white">{movie.Director}</p>
                  </div>
                )}
                
                {movie.Writer !== 'N/A' && (
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="text-white/50 text-sm mb-1">Writer</h4>
                    <p className="text-white">{movie.Writer}</p>
                  </div>
                )}
                
                {movie.Actors !== 'N/A' && (
                  <div className="glass-card p-4 rounded-lg md:col-span-2">
                    <h4 className="text-white/50 text-sm mb-1">Actors</h4>
                    <p className="text-white">{movie.Actors}</p>
                  </div>
                )}
              </div>
            </div>
            
            {movie.Genre !== 'N/A' && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre) => (
                    <div key={genre} className="chip bg-white/5 text-white/80">{genre}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Details</h2>
            <div className="space-y-4">
              {movie.Released !== 'N/A' && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-film-light-purple mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white/50 text-sm">Released</h4>
                    <p className="text-white">{movie.Released}</p>
                  </div>
                </div>
              )}
              
              {movie.Country !== 'N/A' && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-film-light-purple mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white/50 text-sm">Country</h4>
                    <p className="text-white">{movie.Country}</p>
                  </div>
                </div>
              )}
              
              {movie.Language !== 'N/A' && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-film-light-purple mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white/50 text-sm">Language</h4>
                    <p className="text-white">{movie.Language}</p>
                  </div>
                </div>
              )}
              
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-film-light-purple mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white/50 text-sm">Box Office</h4>
                    <p className="text-white">{movie.BoxOffice}</p>
                  </div>
                </div>
              )}
              
              {movie.Awards !== 'N/A' && (
                <div className="flex items-start">
                  <Award className="w-5 h-5 text-film-light-purple mr-3 mt-0.5" />
                  <div>
                    <h4 className="text-white/50 text-sm">Awards</h4>
                    <p className="text-white">{movie.Awards}</p>
                  </div>
                </div>
              )}
              
              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Ratings</h3>
                  <div className="space-y-3">
                    {movie.Ratings.map((rating, index) => (
                      <div key={index} className="glass-card p-3 rounded-lg">
                        <h4 className="text-white/50 text-sm">{rating.Source}</h4>
                        <p className="text-white font-medium">{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
