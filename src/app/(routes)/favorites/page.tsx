'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { News, getNews } from '../../_services';
import { NewsCard } from '../../_components';

function Favorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [newsList, setNewsList] = useState<News[]>([]);

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavorite = useCallback((id: string, state: boolean) => {
    console.log({ id, state });
  }, []);

  return (
    <div>
      <main className="mt-5">
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {!isLoading &&
            newsList.map((news) => {
              return (
                <NewsCard
                  key={news.id}
                  isFavorite={false}
                  {...news}
                  onRedirect={handleRedirect}
                  onFavorite={handleFavorite}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
}

export default Favorites;
