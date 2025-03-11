
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Film, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import { searchMovies } from '@/services/omdbApi';
import { Movie } from '@/types/movie';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchMovies(debouncedSearchTerm);
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm]);

  const handleViewMovie = (imdbID: string) => {
    navigate(`/movie/${imdbID}`);
    if (onClose) onClose();
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="flex items-center glass-card overflow-hidden rounded-xl">
          <div className="pl-4">
            <Search className="w-5 h-5 text-white/60" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for movies or TV shows..."
            className="w-full bg-transparent border-0 h-12 px-4 text-white focus:ring-0 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="p-2 mr-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          )}
        </div>

        {/* Results dropdown */}
        {(results.length > 0 || isLoading) && isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl overflow-hidden shadow-lg max-h-[60vh] overflow-y-auto scrollbar-hide z-20">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 text-film-purple animate-spin" />
                <span className="ml-2 text-white/80">Searching...</span>
              </div>
            ) : (
              <>
                <div className="p-3 border-b border-white/10">
                  <p className="text-sm text-white/60">{results.length} results</p>
                </div>
                <ul>
                  {results.map((movie) => (
                    <li key={movie.imdbID} className="border-b border-white/5 last:border-0">
                      <button
                        onClick={() => handleViewMovie(movie.imdbID)}
                        className="w-full text-left p-3 flex items-center space-x-3 hover:bg-white/5 transition-colors"
                      >
                        {movie.Poster && movie.Poster !== 'N/A' ? (
                          <img 
                            src={movie.Poster} 
                            alt={movie.Title} 
                            className="w-12 h-16 object-cover rounded"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-12 h-16 bg-film-dark-purple/50 rounded flex items-center justify-center">
                            <Film className="w-6 h-6 text-white/40" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{movie.Title}</p>
                          <p className="text-sm text-white/60">{movie.Year} · {movie.Type}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
