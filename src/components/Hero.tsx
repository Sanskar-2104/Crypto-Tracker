import { useState } from 'react';
import { Button } from '@/components/ui/button';
import CryptoChart from './CryptoChart';
import { useCoinList } from '@/hooks/useCryptoData';
import type { Coin } from '@/services/cryptoApi';

const Hero = () => {
  const { coins, loading } = useCoinList();
  const [selectedCoin, setSelectedCoin] = useState<Coin | undefined>(undefined);
  const [timeframe, setTimeframe] = useState('24h');

  // Use Bitcoin as default when data loads
  const displayCoin = selectedCoin || (coins.length > 0 ? coins[0] : undefined);

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full filter blur-[120px] pointer-events-none" aria-hidden="true"></div>
      
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 mb-10">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Track Crypto <span className="text-gradient">Prices</span> in Real-Time
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Monitor cryptocurrency markets with our advanced tracking tools. 
              Get real-time data on Bitcoin, Ethereum, and other top cryptocurrencies.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full glass p-4 rounded-lg">
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-pulse-slow">Loading chart data...</div>
              </div>
            ) : (
              <div>
                {/* Chart header */}
                <div className="flex flex-wrap items-center justify-between mb-4">
                  <div className="flex items-center mb-2 md:mb-0">
                    {displayCoin && (
                      <>
                        <img 
                          src={displayCoin.image} 
                          alt={displayCoin.name} 
                          className="w-8 h-8 mr-2 rounded-full"
                        />
                        <div>
                          <h2 className="font-bold text-xl">{displayCoin.name}</h2>
                          <p className="text-sm text-muted-foreground">{displayCoin.symbol.toUpperCase()}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {['1h', '24h', '7d', '30d', '1y'].map((time) => (
                      <Button
                        key={time}
                        variant={timeframe === time ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => setTimeframe(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Chart */}
                <div className="h-[400px]">
                  <CryptoChart coin={displayCoin} height={400} />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Coin selector */}
        {!loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {coins.slice(0, 6).map((coin) => (
              <Button
                key={coin.id}
                variant="ghost"
                className={`flex items-center justify-start p-2 ${selectedCoin?.id === coin.id ? 'bg-primary/20' : ''}`}
                onClick={() => setSelectedCoin(coin)}
              >
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                <span>{coin.symbol.toUpperCase()}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;