import { Baskervville } from 'next/font/google';

const baskervville = Baskervville({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

function Header() {
  return (
    <div className="bg-gradient-to-b from-[#ececec] to-[#ffffff] dark:from-[#212121] dark:to-[#212121] h-[7.125rem] flex items-center text-[1.75rem] shadow-md dark:shadow-white justify-center">
      <h1
        className={
          baskervville.className +
          ' uppercase w-11/12 max-w-7xl text-center sm:text-left'
        }
      >
        hacker news
      </h1>
    </div>
  );
}

export default Header;
