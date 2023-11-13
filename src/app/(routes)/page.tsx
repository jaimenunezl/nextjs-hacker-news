'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, NewsCard } from '../_components';
import { useEffect, useState, useCallback, useRef } from 'react';
import { News, getNews } from '../_services';

export default function Home() {
  const searchParams = useSearchParams();
  const categoryParam: string = searchParams.get('category') || '';
  const pageParam: number = Number(searchParams.get('page')) || 0;

  const [category, setCategory] = useState('');
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentPage = useRef(pageParam);

  const handleRedirect = useCallback((url: string) => {
    window.open(url, '_blank');
  }, []);

  const handleFavorite = useCallback((id: string, state: boolean) => {
    console.log({ id, state });
  }, []);

  // const pathName = usePathname();
  // const router = useRouter();

  // const createQueryString = (name: string, value: string) => {
  //   const params = new URLSearchParams();
  //   params.set(name, value);

  //   return params.toString();
  // };

  // useEffect(() => {
  //   if (!category) return;

  //   router.replace(
  //     pathName +
  //       '?' +
  //       createQueryString('category', category) +
  //       createQueryString('page', currentPage.current.toString()),
  //     {
  //       scroll: false,
  //     }
  //   );
  // }, [category]);

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const result = await getNews(category, currentPage.current);
      console.log({ result });

      setNewsList(result);
      setIsLoading(false);
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
