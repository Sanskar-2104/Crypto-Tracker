import { useEffect, useRef } from 'react';
import { useNewsItems } from '@/hooks/useCryptoData';

const NewsTicker = () => {
  const { news, loading } = useNewsItems();
  const tickerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Clone ticker content for continuous scrolling
  useEffect(() => {
    if (!loading && news.length > 0 && tickerRef.current && wrapperRef.current) {
      // Check if we need to clone the content
      const needsCloning = tickerRef.current.scrollWidth < wrapperRef.current.clientWidth * 2;
      
      if (needsCloning) {
        // Clone the ticker content to make continuous scrolling
        const clone = tickerRef.current.cloneNode(true);
        wrapperRef.current.appendChild(clone);
      }
    }
  }, [loading, news]);

  if (loading) {
    return (
      <div className="w-full bg-black/40 backdrop-blur-sm py-3 border-y border-white/5">
        <div className="container px-4 mx-auto">
          <div className="animate-pulse-slow h-6 bg-white/5 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black/40 backdrop-blur-sm py-3 border-y border-white/5 overflow-hidden">
      <div className="relative" ref={wrapperRef}>
        <div 
          ref={tickerRef}
          className="flex animate-slide-left whitespace-nowrap"
        >
          {news.map((item) => (
            <div key={item.id} className="flex items-center mx-4">
              <span className="text-sm text-primary font-semibold mr-2">{item.source}</span>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-primary"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
