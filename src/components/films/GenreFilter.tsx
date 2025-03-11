
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GenreFilterProps {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
  className?: string;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ 
  genres, 
  activeGenre, 
  onGenreChange,
  className 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const checkScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll(); // Check initially
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
    };
  }, [genres]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Left scroll button */}
      {showLeftArrow && (
        <button 
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-film-deep-blue/80 backdrop-blur-sm shadow-md"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 text-white/70" />
        </button>
      )}
      
      {/* Genres scroll container */}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-2 overflow-x-auto scrollbar-hide py-2 px-1 relative"
      >
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => onGenreChange(genre)}
            className={`chip whitespace-nowrap transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              activeGenre === genre 
                ? 'bg-gradient-to-r from-film-purple to-film-pink text-white shadow-sm' 
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      
      {/* Right scroll button */}
      {showRightArrow && (
        <button 
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-full bg-film-deep-blue/80 backdrop-blur-sm shadow-md"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 text-white/70" />
        </button>
      )}
      
      {/* Fade effects for scrolling */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-film-deep-blue to-transparent pointer-events-none" />
      )}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-film-deep-blue to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default GenreFilter;
