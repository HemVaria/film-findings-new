
import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Clock, Heart, List, Play, Star, User, Settings, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-64 flex-col bg-card p-4 border-r border-border">
        <div className="flex items-center mb-8">
          <Film className="h-6 w-6 text-film-purple mr-2" />
          <h1 className="font-bold text-xl">FilmUpdate</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Link to="/dashboard" className="flex items-center p-3 text-white rounded-lg bg-film-purple bg-opacity-20">
            <div className="w-10 flex items-center justify-center">
              <List className="h-5 w-5" />
            </div>
            <span className="ml-2">Dashboard</span>
          </Link>
          
          <Link to="/watchlist" className="flex items-center p-3 text-muted-foreground rounded-lg hover:bg-white/5">
            <div className="w-10 flex items-center justify-center">
              <Heart className="h-5 w-5" />
            </div>
            <span className="ml-2">Watchlist</span>
          </Link>
          
          <Link to="/history" className="flex items-center p-3 text-muted-foreground rounded-lg hover:bg-white/5">
            <div className="w-10 flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <span className="ml-2">History</span>
          </Link>
          
          <Separator className="my-4" />
          
          <Link to="/profile" className="flex items-center p-3 text-muted-foreground rounded-lg hover:bg-white/5">
            <div className="w-10 flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
            <span className="ml-2">Profile</span>
          </Link>
          
          <Link to="/settings" className="flex items-center p-3 text-muted-foreground rounded-lg hover:bg-white/5">
            <div className="w-10 flex items-center justify-center">
              <Settings className="h-5 w-5" />
            </div>
            <span className="ml-2">Settings</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-4">
          <div className="glass-card p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1 flex-shrink-0" />
              <span className="text-sm font-medium">Premium Plan</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Upgrade for exclusive features and ad-free experience
            </p>
            <Button size="sm" className="w-full premium-button">
              Upgrade
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gradient-pink mb-2">Welcome back, Cinephile</h1>
            <p className="text-muted-foreground">
              Keep track of your movie experiences and discover new films
            </p>
          </header>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">Watched</h3>
                <Film className="h-5 w-5 text-film-purple" />
              </div>
              <p className="text-3xl font-bold">28</p>
              <p className="text-sm text-muted-foreground">movies this month</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">Watchlist</h3>
                <Heart className="h-5 w-5 text-film-pink" />
              </div>
              <p className="text-3xl font-bold">14</p>
              <p className="text-sm text-muted-foreground">movies to watch</p>
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">Reviews</h3>
                <Star className="h-5 w-5 text-yellow-400" />
              </div>
              <p className="text-3xl font-bold">9</p>
              <p className="text-sm text-muted-foreground">reviews written</p>
            </div>
          </div>
          
          {/* Continue Watching */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Continue Watching</h2>
              <Link to="/history" className="text-sm text-film-purple flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="subtle-card">
                <div className="relative aspect-video">
                  <img 
                    src="https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg" 
                    alt="Dune"
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <span className="block text-sm font-medium">Continue</span>
                        <span className="text-xs text-white/70">1:24:15 remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">Dune (2021)</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-white/70">8.0</span>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-sm text-white/70">Sci-Fi</span>
                  </div>
                </div>
              </div>
              
              <div className="subtle-card">
                <div className="relative aspect-video">
                  <img 
                    src="https://m.media-amazon.com/images/M/MV5BYjk0MTgzMmQtZmY2My00NmE5LWExNGUtYjZkNTA3ZDkyMTJiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg" 
                    alt="Blade Runner 2049"
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <span className="block text-sm font-medium">Continue</span>
                        <span className="text-xs text-white/70">58:30 remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">Blade Runner 2049 (2017)</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-white/70">8.1</span>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-sm text-white/70">Sci-Fi</span>
                  </div>
                </div>
              </div>
              
              <div className="subtle-card">
                <div className="relative aspect-video">
                  <img 
                    src="https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg" 
                    alt="Interstellar"
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full">
                        <Play className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <span className="block text-sm font-medium">Continue</span>
                        <span className="text-xs text-white/70">2:05:12 remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white">Interstellar (2014)</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-white/70">8.7</span>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-sm text-white/70">Sci-Fi</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Recommended for You */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recommended For You</h2>
              <Link to="/recommendations" className="text-sm text-film-purple flex items-center">
                More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            <Card className="glass-card p-6 mt-8">
              <h2 className="text-xl font-bold text-white mb-4">This Week's Highlights</h2>
              <div className="bg-white/5 rounded-lg p-4 flex flex-col md:flex-row items-center">
                <img 
                  src="https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg" 
                  alt="Dune: Part Two"
                  className="w-full md:w-1/3 h-48 md:h-full object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
                />
                <div className="md:flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="chip bg-film-purple/20 text-film-light-purple">New Release</span>
                    <span className="chip bg-yellow-500/20 text-yellow-400">Top Rated</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">Dune: Part Two (2024)</h3>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-white/70">8.8</span>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-sm text-white/70">Sci-Fi, Adventure</span>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-sm text-white/70">2h 46m</span>
                  </div>
                  <p className="text-sm text-white/70 mb-4">
                    Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button className="premium-button">
                      <Play className="mr-2 h-4 w-4" /> 
                      Watch Now
                    </Button>
                    <Button variant="outline">
                      <Heart className="mr-2 h-4 w-4" /> 
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
