import React from 'react';
import { Baskervville } from 'next/font/google';

const baskervville = Baskervville({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

function Header() {
  return (
    <div className="bg-gradient-to-b from-[#ececec] to-[#ffffff] dark:from-black dark:to-black h-[7.125rem] flex items-center text-[1.75rem] shadow-sm">
      <h1 className={baskervville.className + ' uppercase px-2 lg:px-20'}>
        hacker news
      </h1>
    </div>
  );
}

export default Header;
