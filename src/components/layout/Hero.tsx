
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (buttonContainerRef.current) observer.observe(buttonContainerRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (buttonContainerRef.current) observer.unobserve(buttonContainerRef.current);
    };
  }, []);

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const exploreMovies = () => {
    navigate('/trending');
  };

  const titleWords = ['Discover', 'Your', 'Next', 'Favorite', 'Watch'];

  return (
    <section className="relative flex items-center justify-center bg-film-darker-blue">
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center text-center">
        <h1 
          ref={titleRef}
          className="opacity-0 transition-opacity duration-700 delay-300"
        >
          {titleWords.map((word, index) => (
            <span 
              key={index} 
              className={`text-4xl md:text-6xl lg:text-7xl font-bold inline-block transition-all
                ${index === 0 || index === 4 ? 'text-gradient-purple' : 'text-white'}
                ${index < titleWords.length - 1 ? 'mr-4 md:mr-6' : ''}
              `}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>
        
        <p 
          ref={subtitleRef}
          className="mt-6 max-w-2xl text-white/80 text-lg md:text-xl opacity-0 transition-opacity duration-700 delay-800"
        >
          Personalized movie and series recommendations tailored just for you. Never miss another hidden gem again.
        </p>
        
        <div 
          ref={buttonContainerRef}
          className="mt-10 space-x-4 opacity-0 transition-opacity duration-700 delay-1000"
        >
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
