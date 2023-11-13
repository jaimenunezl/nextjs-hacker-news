'use client';

import { useRouter } from 'next/navigation';
import { Header, Switch } from '../_components';
import { useState } from 'react';

function LayoutPage({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState('all');

  const router = useRouter();

  const handleChange = (value: string) => {
    setActive(value);
    router.push(value === 'all' ? '/' : '/favorites');
  };

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
