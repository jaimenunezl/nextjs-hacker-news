'use client';

import { Header, Switch } from '@/app/_components';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function LayoutPage({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    setActive(value);
    router.push(value === 'all' ? '/home' : '/favorites');
  };

  useEffect(() => {
    if (pathname.includes('favorites')) {
      setActive('my faves');
    } else {
      setActive('all');
    }
  }, [pathname]);

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
    </div>
  );
}

export default LayoutPage;
