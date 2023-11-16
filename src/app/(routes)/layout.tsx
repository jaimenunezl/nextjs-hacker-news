'use client';

import { Header, Switch } from '@/app/_components';
import { useLocalStorage } from '@/app/_hooks';
import { LocalStorageKeys } from '@/app/_shared/enums';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaMoon, FaRegSun } from 'react-icons/fa6';

function LayoutPage({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('');
  const { item: isDark, updateItem: setIsDark } = useLocalStorage(
    LocalStorageKeys.DARK_MODE,
    false
  );
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    setActive(value);
    router.push(value === 'all' ? '/home' : '/favorites');
  };

  const onChangeDarkMode = (status: boolean) => {
    setIsDark(status);
  };

  const handleHtmlDarkClass = (state: boolean) => {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      if (state) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  };

  useEffect(() => {
    if (pathname.includes('favorites')) {
      setActive('my faves');
    } else {
      setActive('all');
    }
  }, [pathname]);

  useEffect(() => {
    handleHtmlDarkClass(isDark);
  }, [isDark]);

  return (
    <div>
      <Header />

      <div className="flex items-center flex-col mb-10 mt-10 md:mt-20">
        <Switch
          active={active}
          options={['all', 'my faves']}
          onChange={handleChange}
        />
        <div className="w-11/12 max-w-7xl">{children}</div>
      </div>

      <div className="fixed top-0 right-0 flex cursor-pointer gap-3 pt-2 pr-2">
        <FaRegSun
          className={!isDark ? 'text-orange-400' : '' + 'hover:text-orange-400'}
          onClick={() => onChangeDarkMode(false)}
        />
        <FaMoon
          className={isDark ? 'text-blue-700' : '' + 'hover:text-blue-700'}
          onClick={() => onChangeDarkMode(true)}
        />
      </div>
    </div>
  );
}

export default LayoutPage;
