'use client';

import { useRouter } from 'next/navigation';

function Error() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <h2>Page Not Found</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
        onClick={() => {
          router.push('/');
        }}
      >
        Go Home
      </button>
    </div>
  );
}

export default Error;
