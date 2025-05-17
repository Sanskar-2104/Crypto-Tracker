import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchCoins } from '@/hooks/useCryptoData';
import type { Coin } from '@/services/cryptoApi';

const CoinSearch = () => {
  const [query, setQuery] = useState('');
  const { searchResults, loading, searchCoins } = useSearchCoins();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      searchCoins(query);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 2) {
      searchCoins(query);
    }
  };

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Search Cryptocurrencies</h2>
          <p className="text-muted-foreground">Track prices, analyze charts, and stay updated with the latest market trends</p>
        </div>
        
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or symbol..."
              className="py-6 pl-12 pr-4 text-lg glass-card bg-opacity-30 backdrop-blur-sm"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2" 
              disabled={query.length < 2}
            >
              Search
            </Button>
          </form>
          
          {showResults && (
            <div className="glass-card p-3 max-h-80 overflow-y-auto">
              {loading ? (
                <div className="text-center py-4">
                  <div className="animate-pulse-slow">Searching...</div>
                </div>
              ) : searchResults.length > 0 ? (
                <ul className="divide-y divide-white/5">
                  {searchResults.map((coin: Coin) => (
                    <li key={coin.id} className="py-3 px-2 hover:bg-white/5 transition-colors rounded flex items-center">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-3" />
                      <div className="flex-1">
                        <h3 className="font-medium">{coin.name}</h3>
                        <p className="text-sm text-muted-foreground">{coin.symbol.toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${coin.current_price.toLocaleString()}
                        </p>
                        <p className={coin.price_change_percentage_24h >= 0 ? "text-success text-sm" : "text-destructive text-sm"}>
                          {coin.price_change_percentage_24h >= 0 ? "+" : ""}{coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoinSearch;