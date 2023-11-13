'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

function Error() {
  const router = useRouter();

  return (
    <div>
      Página no encontrada
      <button
        onClick={() => {
          router.push('/');
        }}
      >
        Volver al home
      </button>
    </div>
  );
}

export default Error;
