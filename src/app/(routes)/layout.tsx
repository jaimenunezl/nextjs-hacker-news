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
    router.push(value === 'all' ? '/' : '/favorites');
  };

  useEffect(() => {
    if (pathname.includes('favorites')) {
      setActive('my faves');
    } else {
      setActive('all');
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex justify-center my-20">
        <Switch
          active={active}
          options={['all', 'my faves']}
          onChange={handleChange}
        />
      </div>
      <div className="px-2 lg:px-20">{children}</div>
    </div>
  );
}

export default LayoutPage;
