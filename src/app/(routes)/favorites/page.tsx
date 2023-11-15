'use client';

import { ErrorMessage, NewsCard, Spinner } from '@/app/_components';
import { useLocalStorage } from '@/app/_hooks';
import { News } from '@/app/_services';
import { LocalStorageKeys } from '@/app/_shared/enums';
import { useCallback, useState, useEffect } from 'react';

function Favorites() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { item: favList, updateItem: setFavList } = useLocalStorage<News[]>(
    LocalStorageKeys.FAVORITE_NEWS,
    []
  );

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavorite = (id: string) => {
    const newFavList = favList.filter((fav) => fav.id !== id);
    setFavList(newFavList);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <main className="mt-10">
        {isLoading && <Spinner />}

        {!isLoading && favList.length === 0 && (
          <ErrorMessage defaultErrorMessage="No favorites yet" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {!isLoading &&
            favList.map((news) => {
              return (
                <NewsCard
                  {...news}
                  key={news.id}
                  isFavorite={true}
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
