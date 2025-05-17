import { useState, useEffect } from 'react';
import { cryptoApi, Coin, NewsItem } from '../services/cryptoApi';

export const useCoinList = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getCoins();
        setCoins(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch coin data');
        console.error('Error fetching coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, loading, error };
};

export const useTrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getTrendingCoins();
        setTrendingCoins(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending coins');
        console.error('Error fetching trending coins:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return { trendingCoins, loading, error };
};

export const useTopMovers = () => {
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        setLoading(true);
        const [gainersData, losersData] = await Promise.all([
          cryptoApi.getTopGainers(),
          cryptoApi.getTopLosers()
        ]);
        
        setGainers(gainersData);
        setLosers(losersData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch top movers');
        console.error('Error fetching top movers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovers();
  }, []);

  return { gainers, losers, loading, error };
};

export const useNewsItems = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getNews();
        setNews(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch news');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};

export const useSearchCoins = () => {
  const [searchResults, setSearchResults] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCoins = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    try {
      setLoading(true);
      const data = await cryptoApi.searchCoins(query);
      setSearchResults(data);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error('Error during search:', err);
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, searchCoins };
};