import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const exploreMovies = () => {
    navigate('/trending');
  };

  return (
    <section className="relative bg-film-darker-blue">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 flex flex-col items-center justify-center text-center">
        <h1 className="animate-fade-in">
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold inline-block text-gradient-purple mr-2 md:mr-4">
            Discover
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold inline-block text-white mr-2 md:mr-4">
            Your
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold inline-block text-white mr-2 md:mr-4">
            Next
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold inline-block text-white mr-2 md:mr-4">
            Favorite
          </span>
          <span className="text-4xl md:text-6xl lg:text-7xl font-bold inline-block text-gradient-purple">
            Watch
          </span>
        </h1>
        
        <p className="mt-4 md:mt-6 max-w-2xl text-white/80 text-lg md:text-xl animate-fade-in">
          Personalized movie and series recommendations tailored just for you. Never miss another hidden gem again.
        </p>
        
        <div className="mt-6 md:mt-8 space-x-4 animate-fade-in">
          <button 
            onClick={goToDashboard}
            className="premium-button px-6 py-3 rounded-full font-medium text-white flex items-center"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
          
          <button 
            onClick={exploreMovies}
            className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium"
          >
            Explore Trending
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
