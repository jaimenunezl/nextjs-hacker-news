'use client';

import { Select } from '../_components';
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('');

  return (
    <div className="mt-5">
      <div className="w-[240px]">
        <Select
          placeholder="Seleccione la categoría"
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
          onChange={(value) => console.log(value)}
        />
      </div>
    </div>
  );
}
