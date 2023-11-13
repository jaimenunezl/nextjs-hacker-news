'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NewsCard, Select } from '../_components';
import { News, getNews } from '../_services';

export default function Home() {
  const [category, setCategory] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentPage = useRef(0);

  const searchParams = useSearchParams();
  const categoryParam: string = searchParams.get('category') || '';
  const pageParam: number = Number(searchParams.get('page')) || 0;

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavorite = useCallback((id: string, state: boolean) => {
    console.log({ id, state });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const getData = async () => {
      let result;

      try {
        result = await getNews(category, currentPage.current);
        console.log({ result });
        setNewsList(result);
      } catch (error: unknown) {
        error instanceof Error
          ? setError(error)
          : setError(new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [category]);

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
          valueSelected={categoryParam}
          onChange={(value) => {
            setCategory(value);
          }}
        />
      </header>
      <main className="mt-5">
        {isLoading && (
          <div className="w-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
          </div>
        )}

        {error && (
          <div className="w-full flex justify-center items-center">
            <div className="text-red-500">
              {error.message ||
                'We did not find any news. Try again with another category.'}
            </div>
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
