import { useEffect, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import type { Coin } from '@/services/cryptoApi';

interface CryptoChartProps {
  coin?: Coin;
  minimal?: boolean;
  height?: number;
  showTooltip?: boolean;
  showGrid?: boolean;
  showAxis?: boolean;
  color?: string;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ 
  coin,
  minimal = false,
  height = 400,
  showTooltip = true,
  showGrid = true,
  showAxis = true,
  color = "#8B5CF6" // Default is primary color
}) => {
  // Generate mock chart data if no coin provided
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (coin?.sparkline_in_7d?.price) {
      // Format the data from the coin's sparkline
      const formattedData = coin.sparkline_in_7d.price.map((price, i) => ({
        time: i, // This would be a timestamp in a real app
        price
      }));
      
      setChartData(formattedData);
    } else {
      // Generate mock data if no sparkline available
      const mockData = Array(24).fill(0).map((_, i) => ({
        time: i,
        price: 45000 + Math.random() * 5000
      }));
      
      setChartData(mockData);
    }
  }, [coin]);

  // Determine if the trend is positive
  const isPositive = chartData.length > 1 ? 
    chartData[chartData.length - 1].price > chartData[0].price : true;
  
  // Set chart color based on trend if no color provided
  const chartColor = color ? color : isPositive ? "hsl(var(--success))" : "hsl(var(--destructive))";
  
  if (minimal) {
    // Simple small chart for cards
    return (
      <ResponsiveContainer width="100%" height={height || 60}>
        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`colorGradient-${coin?.id || 'default'}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={chartColor} 
            fill={`url(#colorGradient-${coin?.id || 'default'})`} 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />}
        {showAxis && <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />}
        {showAxis && 
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fontSize: 12 }} 
            domain={['auto', 'auto']} 
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
        }
        {showTooltip && 
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label) => `Time: ${label}`}
          />
        }
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke={chartColor} 
          fill="url(#colorGradient)" 
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CryptoChart;