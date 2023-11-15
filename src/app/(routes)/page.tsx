'use client';

import { NewsCard, Select } from '@/app/_components';
import { useLocalStorage } from '@/app/_hooks';
import { News, getNews } from '@/app/_services';
import { LocalStorageKeys } from '@/app/_shared/enums';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Home() {
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [canPaginate, setCanPaginate] = useState<boolean>(false);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [newsListWithFav, setNewsListWithFav] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentNewsRequest = useRef<NodeJS.Timeout | undefined>();

  const { item: favList, updateItem: setFavList } = useLocalStorage<News[]>(
    LocalStorageKeys.FAVORITE_NEWS,
    []
  );
  const { item: category, updateItem: setCategory } = useLocalStorage<string>(
    LocalStorageKeys.NEWS_FILTER_SELECTED,
    ''
  );

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavorite = (id: string, state: boolean) => {
    if (state) {
      const newsItem = newsList.find((news) => news.id === id);
      if (!newsItem) return;

      setFavList([...favList, newsItem]);
    } else {
      const newFavList = favList.filter((fav) => fav.id !== id);
      setFavList(newFavList);
    }
  };

  const onFilterChange = (filter: string) => {
    if (filter === category) return;

    setError(null);
    setNewsList([]);
    setNewsListWithFav([]);
    setCurrentPage(0);
    setCategory(filter);
  };

  useEffect(() => {
    const favNews = newsList.map((news) => {
      const fav = favList.find((fav) => fav.id === news.id);
      return {
        ...news,
        isFavorite: !!fav,
      };
    });

    setNewsListWithFav(favNews);
  }, [newsList, favList]);

  useEffect(() => {
    const handleScroll = () => {
      setCanPaginate(false);
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        setCanPaginate(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);

    if (currentNewsRequest.current) {
      clearTimeout(currentNewsRequest.current);
    }

    currentNewsRequest.current = setTimeout(async () => {
      let result: News[] = [];

      try {
        result = await getNews(category, currentPage);
        setCurrentPage((current) => current + 1);
        setNewsList((list) => [...list, ...result]);
      } catch (error: unknown) {
        error instanceof Error
          ? setError(error)
          : setError(new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (currentNewsRequest.current) {
        clearTimeout(currentNewsRequest.current);
      }
    };
  }, [category, canPaginate]);

  return (
    <div className="mt-5">
      <header className="w-[240px]">
        <Select
          placeholder="Select your news"
          options={[
            {
              key: 'angular',
              value: 'angular',
              iconUrl: '/assets/angular.png',
            },
            { key: 'react', value: 'react', iconUrl: '/assets/react.png' },
            { key: 'vue', value: 'vue', iconUrl: '/assets/vue.png' },
          ]}
          valueSelected={category}
          onChange={(value) => {
            onFilterChange(value);
          }}
        />
      </header>
      <main className="mt-5">
        {error && (
          <div className="w-full flex justify-center items-center">
            <div className="text-red-500">
              {error.message ||
                'We did not find any news. Try again with another category.'}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 mb-10">
          {newsListWithFav.map((news) => {
            return (
              <NewsCard
                key={news.id}
                {...news}
                onRedirect={handleRedirect}
                onFavorite={handleFavorite}
              />
            );
          })}
        </div>

        {isLoading && (
          <div className="w-full flex justify-center items-center my-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
          </div>
        )}
      </main>
    </div>
  );
}
