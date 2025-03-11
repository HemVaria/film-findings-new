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
    <section className="bg-film-darker-blue py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="animate-fade-in">
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold inline-block text-gradient-purple mr-2">Discover</span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold inline-block text-white mr-2">Your</span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold inline-block text-white mr-2">Next</span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold inline-block text-white mr-2">Favorite</span>
            <span className="text-3xl md:text-5xl lg:text-6xl font-bold inline-block text-gradient-purple">Watch</span>
          </h1>
          
          <p className="mt-3 md:mt-4 max-w-2xl text-white/80 text-base md:text-lg animate-fade-in">
            Personalized movie and series recommendations tailored just for you. Never miss another hidden gem again.
          </p>
          
          <div className="mt-5 space-x-3 animate-fade-in">
            <button 
              onClick={goToDashboard}
              className="premium-button px-5 py-2.5 rounded-full font-medium text-white flex items-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            
            <button 
              onClick={exploreMovies}
              className="px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium"
            >
              Explore Trending
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;