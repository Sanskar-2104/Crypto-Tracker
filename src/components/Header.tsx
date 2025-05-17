import { useState } from 'react';
import { Menu, Search, Bitcoin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useSearchCoins } from '../hooks/useCryptoData';
import type { Coin } from '../services/cryptoApi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchResults, loading, searchCoins } = useSearchCoins();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchCoins(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-white/10">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Bitcoin className="h-8 w-8 mr-2 text-primary" />
          <span className="text-xl font-bold text-gradient">CryptoTrack</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Markets</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">News</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Portfolio</a>
        </nav>

        <div className="flex items-center space-x-2">
          {/* Search Bar (Desktop) */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search coins..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-64 bg-secondary/50 border-white/5 focus:border-primary"
            />
            {searchQuery.length > 1 && (
              <div className="absolute top-full mt-1 w-full glass-card rounded-md p-2 max-h-60 overflow-auto z-50">
                {loading ? (
                  <div className="p-2 text-sm">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((coin: Coin) => (
                      <li key={coin.id} className="p-2 hover:bg-white/5 rounded cursor-pointer flex items-center">
                        <img src={coin.image} alt={coin.name} className="w-5 h-5 mr-2" />
                        <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                      </li>
                    ))}
                  </ul>
                ) : searchQuery ? (
                  <div className="p-2 text-sm text-muted-foreground">No results found</div>
                ) : null}
              </div>
            )}
          </div>

          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Sign In Button (Desktop) */}
          <Button variant="outline" className="hidden md:flex">Sign In</Button>
        </div>
      </div>

      {/* Mobile Search Panel */}
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t border-white/10">
          <Input
            type="text"
            placeholder="Search coins..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-secondary/50 border-white/5"
          />
          {searchQuery.length > 1 && (
            <div className="mt-2 glass-card rounded-md p-2 max-h-60 overflow-auto">
              {loading ? (
                <div className="p-2 text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((coin: Coin) => (
                    <li key={coin.id} className="p-2 hover:bg-white/5 rounded cursor-pointer flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-5 h-5 mr-2" />
                      <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-2 text-sm text-muted-foreground">No results found</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-white/10 p-4">
          <ul className="space-y-2">
            <li><a href="#" className="block p-2 hover:bg-white/5 rounded">Dashboard</a></li>
            <li><a href="#" className="block p-2 hover:bg-white/5 rounded">Markets</a></li>
            <li><a href="#" className="block p-2 hover:bg-white/5 rounded">News</a></li>
            <li><a href="#" className="block p-2 hover:bg-white/5 rounded">Portfolio</a></li>
            <li><Button className="w-full mt-2">Sign In</Button></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;