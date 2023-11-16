import '@/app/globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hacker News',
  description: 'Hacker News Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          roboto.className +
          ' text-black dark:text-gray-300 bg-white dark:bg-gray-900'
        }
      >
        {children}
      </body>
    </html>
  );
}
