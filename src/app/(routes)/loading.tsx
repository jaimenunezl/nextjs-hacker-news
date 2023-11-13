import React from 'react';

function Loading() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-sky-400"></div>
    </div>
  );
}

export default Loading;
