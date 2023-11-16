import { Spinner } from '@/app/_components';

function Loading() {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <Spinner />
    </div>
  );
}

export default Loading;
