import { useTopMovers } from '@/hooks/useCryptoData';
import CoinCard from './CoinCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

const PriceSection = () => {
  const { gainers, losers, loading } = useTopMovers();

  return (
    <section className="py-12 relative">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="space-y-4">
            <div className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-success" />
              <h2 className="text-2xl font-bold">Top Gainers</h2>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 glass-card animate-pulse-slow"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {gainers.map((coin) => (
                  <CoinCard key={coin.id} coin={coin} showChart={false} compact={true} />
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <TrendingDown className="h-6 w-6 mr-2 text-destructive" />
              <h2 className="text-2xl font-bold">Top Losers</h2>
            </div>
            
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 glass-card animate-pulse-slow"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {losers.map((coin) => (
                  <CoinCard key={coin.id} coin={coin} showChart={false} compact={true} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="glass p-6 rounded-lg">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Looking for more insights?</h3>
            <p className="text-muted-foreground">Get in-depth analysis and exclusive data with our premium plan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="font-semibold mb-1">Market Analysis</h4>
              <p className="text-sm text-muted-foreground">Expert insights on market trends</p>
            </div>
            
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="font-semibold mb-1">Trading Signals</h4>
              <p className="text-sm text-muted-foreground">Timely buy and sell recommendations</p>
            </div>
            
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="font-semibold mb-1">Portfolio Tracking</h4>
              <p className="text-sm text-muted-foreground">Advanced tools for portfolio management</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;