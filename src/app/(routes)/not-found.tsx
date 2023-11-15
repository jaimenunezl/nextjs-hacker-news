'use client';

import { useRouter } from 'next/navigation';

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
