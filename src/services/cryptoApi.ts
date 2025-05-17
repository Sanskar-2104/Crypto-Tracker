// Cryptocurrency data API service

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  price_change_24h: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
}

// Mock data for development (would be replaced with actual API calls)
const mockCoins: Coin[] = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 45678.32,
    market_cap: 889546780432,
    total_volume: 28675345223,
    price_change_24h: 1245.32,
    price_change_percentage_24h: 2.8,
    sparkline_in_7d: {
      price: [45000, 44800, 45100, 45500, 45300, 45700, 45678.32]
    }
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 2456.78,
    market_cap: 289546780432,
    total_volume: 18675345223,
    price_change_24h: -56.32,
    price_change_percentage_24h: -2.2,
    sparkline_in_7d: {
      price: [2500, 2480, 2510, 2490, 2470, 2450, 2456.78]
    }
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    current_price: 0.58,
    market_cap: 28954678043,
    total_volume: 1867534522,
    price_change_24h: 0.02,
    price_change_percentage_24h: 3.5,
    sparkline_in_7d: {
      price: [0.55, 0.56, 0.54, 0.57, 0.58, 0.57, 0.58]
    }
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    current_price: 0.42,
    market_cap: 14954678043,
    total_volume: 867534522,
    price_change_24h: -0.01,
    price_change_percentage_24h: -2.3,
    sparkline_in_7d: {
      price: [0.44, 0.43, 0.45, 0.44, 0.43, 0.42, 0.42]
    }
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    current_price: 145.67,
    market_cap: 54954678043,
    total_volume: 5867534522,
    price_change_24h: 7.82,
    price_change_percentage_24h: 5.7,
    sparkline_in_7d: {
      price: [138, 140, 142, 141, 143, 144, 145.67]
    }
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    current_price: 6.78,
    market_cap: 8954678043,
    total_volume: 467534522,
    price_change_24h: 0.25,
    price_change_percentage_24h: 3.8,
    sparkline_in_7d: {
      price: [6.5, 6.55, 6.6, 6.65, 6.7, 6.75, 6.78]
    }
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
    current_price: 0.09,
    market_cap: 12954678043,
    total_volume: 767534522,
    price_change_24h: -0.003,
    price_change_percentage_24h: -3.2,
    sparkline_in_7d: {
      price: [0.093, 0.092, 0.094, 0.091, 0.09, 0.089, 0.09]
    }
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    current_price: 15.23,
    market_cap: 7954678043,
    total_volume: 567534522,
    price_change_24h: 0.87,
    price_change_percentage_24h: 6.1,
    sparkline_in_7d: {
      price: [14.2, 14.5, 14.8, 14.7, 15.0, 15.1, 15.23]
    }
  }
];

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin Surpasses $45,000 as Institutional Interest Grows",
    url: "#",
    source: "CryptoPulse"
  },
  {
    id: "2",
    title: "Ethereum 2.0 Upgrade: What You Need to Know About the Merge",
    url: "#",
    source: "BlockchainToday"
  },
  {
    id: "3",
    title: "Regulatory Framework for Cryptocurrencies Proposed by SEC",
    url: "#",
    source: "CoinDesk"
  },
  {
    id: "4",
    title: "Solana Network Sees Increase in DeFi Projects and TVL",
    url: "#",
    source: "DeFiDaily"
  },
  {
    id: "5",
    title: "NFT Market Shows Signs of Recovery After Months of Decline",
    url: "#",
    source: "NFTInsider"
  },
  {
    id: "6",
    title: "Major Bank Launches Cryptocurrency Trading Services for Institutional Clients",
    url: "#",
    source: "FinanceNews"
  }
];

// API service functions
export const cryptoApi = {
  getCoins: async (): Promise<Coin[]> => {
    // In a real app, this would be a fetch call to a crypto API
    // return fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h')
    //   .then(res => res.json())
    
    // For now, return mock data
    return new Promise(resolve => {
      setTimeout(() => resolve(mockCoins), 500);
    });
  },
  
  getTrendingCoins: async (): Promise<Coin[]> => {
    // Mock data - would be from API call
    return new Promise(resolve => {
      setTimeout(() => {
        // Return top 5 coins by price change
        const trending = [...mockCoins]
          .sort((a, b) => Math.abs(b.price_change_percentage_24h) - Math.abs(a.price_change_percentage_24h))
          .slice(0, 5);
        resolve(trending);
      }, 500);
    });
  },
  
  getTopGainers: async (): Promise<Coin[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const gainers = [...mockCoins]
          .filter(coin => coin.price_change_percentage_24h > 0)
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
          .slice(0, 4);
        resolve(gainers);
      }, 500);
    });
  },
  
  getTopLosers: async (): Promise<Coin[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const losers = [...mockCoins]
          .filter(coin => coin.price_change_percentage_24h < 0)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
          .slice(0, 4);
        resolve(losers);
      }, 500);
    });
  },
  
  searchCoins: async (query: string): Promise<Coin[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const results = mockCoins.filter(coin => 
          coin.name.toLowerCase().includes(query.toLowerCase()) || 
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },
  
  getNews: async (): Promise<NewsItem[]> => {
    return new Promise(resolve => {
      setTimeout(() => resolve(mockNews), 500);
    });
  }
};
