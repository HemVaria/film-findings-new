
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Menu, User, X, LogOut } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: 'Trending', path: '/trending' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Genres', path: '/genres' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled ? 'bg-film-deep-blue/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="FilmFindings Home"
          >
            <div className="w-10 h-10 rounded bg-gradient-to-br from-film-purple to-film-pink flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-semibold text-lg hidden md:inline-block group-hover:text-film-light-purple transition-colors">
              FilmFindings
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side - actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white/80" />
            </button>
            
            <Link 
              to="/watchlist" 
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Watchlist"
            >
              <Heart className="w-5 h-5 text-white/80" />
            </Link>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-film-purple/10 border border-film-purple/30 hover:bg-film-purple/20 transition-colors">
                <User className="w-4 h-4 text-film-light-purple" />
                <span className="text-sm font-medium text-film-light-purple">{user.email?.split('@')[0]}</span>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-film-purple/10 border border-film-purple/30 hover:bg-film-purple/20 transition-colors"
              >
                <User className="w-4 h-4 text-film-light-purple" />
                <span className="text-sm font-medium text-film-light-purple">Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/5 transition-colors"
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white/80" />
              ) : (
                <Menu className="w-5 h-5 text-white/80" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 p-4 transition-all duration-300 z-40
        ${searchOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="w-full max-w-2xl animate-fade-in">
          <SearchBar onClose={toggleSearch} />
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-film-dark-blue/95 backdrop-blur-sm md:hidden transition-all duration-300 z-40
        ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="h-full flex flex-col p-6 pt-24">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xl font-medium opacity-80 hover:opacity-100 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <Link
              to="/watchlist"
              className="flex items-center space-x-2 text-xl font-medium opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart className="w-5 h-5" />
              <span>Watchlist</span>
            </Link>
            
            {user ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-3 bg-film-purple/10 border border-film-purple/30 rounded-xl">
                  <User className="w-5 h-5 text-film-light-purple" />
                  <span className="font-medium text-film-light-purple">{user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-4 py-3 bg-white/5 rounded-xl"
                >
                  <LogOut className="w-5 h-5 text-white/80" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-4 py-3 bg-film-purple/10 border border-film-purple/30 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5 text-film-light-purple" />
                <span className="font-medium text-film-light-purple">Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
