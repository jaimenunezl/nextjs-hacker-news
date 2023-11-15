'use client';

import { NewsCard } from '@/app/_components';
import { useLocalStorage } from '@/app/_hooks';
import { News } from '@/app/_services';
import { LocalStorageKeys } from '@/app/_shared/enums';
import { useCallback } from 'react';

function Favorites() {
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

  return (
    <div>
      <main className="mt-5">
        {favList.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-2xl font-bold text-gray-700">
              No favorites yet
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {favList.map((news) => {
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
