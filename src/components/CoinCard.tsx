import type { Coin } from '@/services/cryptoApi';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import CryptoChart from './CryptoChart';

interface CoinCardProps {
  coin: Coin;
  showChart?: boolean;
  compact?: boolean;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, showChart = true, compact = false }) => {
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: coin.current_price >= 1 ? 2 : 6,
    maximumFractionDigits: coin.current_price >= 1 ? 2 : 6,
  });

  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const isPriceUp = coin.price_change_percentage_24h > 0;

  if (compact) {
    return (
      <Card className="glass-card overflow-hidden hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center p-3">
          <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full mr-3" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-sm">{coin.name}</h3>
            <span className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</span>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <span className="font-semibold text-sm">{priceFormatter.format(coin.current_price)}</span>
            <div className={`flex items-center text-xs ${isPriceUp ? 'text-success' : 'text-destructive'}`}>
              {isPriceUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center p-4">
        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex flex-col">
          <h3 className="font-semibold">{coin.name}</h3>
          <span className="text-xs text-muted-foreground">{coin.symbol.toUpperCase()}</span>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="font-semibold">{priceFormatter.format(coin.current_price)}</span>
          <div className={`flex items-center text-xs ${isPriceUp ? 'text-success' : 'text-destructive'}`}>
            {isPriceUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
            {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
          </div>
        </div>
      </div>
      
      {showChart && (
        <div className="h-24 w-full">
          <CryptoChart 
            coin={coin} 
            minimal={true} 
            height={60} 
            color={isPriceUp ? "hsl(var(--success))" : "hsl(var(--destructive))"}
          />
        </div>
      )}
      
      <div className="flex justify-between text-xs text-muted-foreground p-3 border-t border-white/5">
        <div>
          <div>Market Cap</div>
          <div className="font-medium text-foreground">${(coin.market_cap / 1000000000).toFixed(2)}B</div>
        </div>
        <div>
          <div>Volume (24h)</div>
          <div className="font-medium text-foreground">${(coin.total_volume / 1000000).toFixed(2)}M</div>
        </div>
      </div>
    </Card>
  );
};

export default CoinCard;