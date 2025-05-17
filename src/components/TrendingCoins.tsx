import { useRef, useState, useEffect } from 'react';
import { useTrendingCoins } from '@/hooks/useCryptoData';
import CoinCard from './CoinCard';
import { Button } from '@/components/ui/button';
import { ChefHat, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';

const TrendingCoins = () => {
  const { trendingCoins, loading } = useTrendingCoins();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const currentCarousel = carouselRef.current;
    if (currentCarousel) {
      checkScrollButtons();
      currentCarousel.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);

      return () => {
        currentCarousel.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, [trendingCoins]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 relative">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Trending Coins</h2>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft || loading}
              className="hidden sm:flex"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight || loading}
              className="hidden sm:flex"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className="min-w-[280px] h-[180px] glass-card animate-pulse-slow"
                ></div>
              ))}
            </div>
          ) : (
            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            >
              {trendingCoins.map((coin) => (
                <div key={coin.id} className="min-w-[280px]">
                  <CoinCard coin={coin} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrendingCoins;