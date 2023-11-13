import type { MouseEvent } from 'react';
import { useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import dayjs from 'dayjs';

import './NewsCard.css';

type NewsCardProps = {
  isFavorite: boolean;
  title: string;
  author: string;
  createdAt: string;
  url: string;
  id: string;
  onFavorite?: (id: string, state: boolean) => void;
  onRedirect?: (url: string) => void;
};

function NewsCard({
  id,
  title,
  author,
  url,
  createdAt,
  isFavorite,
  onFavorite,
  onRedirect,
}: NewsCardProps) {
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavorite = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const isFavCurrent = !isFav;

    setIsFav(isFavCurrent);

    if (!onFavorite) return;
    onFavorite(id, isFavCurrent);
  };

  const handleRedirect = () => {
    if (!onRedirect) return;

    onRedirect(url);
  };

  return (
    <div
      className="border border-gray-400 rounded-lg flex cursor-pointer overflow-hidden hover:opacity-70"
      onClick={handleRedirect}
    >
      <div className="border flex-1 p-4">
        <span className="flex items-center text-gray-500 font-light text-xs">
          <AiOutlineClockCircle className="mr-2 text-xl" />
          {dayjs(createdAt, 'MM-DD-YYYY').toString()} ago by {author}
        </span>
        <h2 className="font-medium text-md mt-2 text-gray-700">{title}</h2>
      </div>
      <div
        className="relative w-[70px] [&>*]:text-red-500 [&>*]:cursor-pointer [&>*]:text-3xl bg-gray-100 [&>*]:absolute [&>*]:top-1/2 [&>*]:left-1/2 [&>*]:transform [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2"
        onClick={(e: MouseEvent<HTMLDivElement>) => handleFavorite(e)}
      >
        <AiFillHeart className={isFav ? 'fav-active' : 'fav-inactive'} />
        <AiOutlineHeart className={!isFav ? 'fav-active' : 'fav-inactive'} />
      </div>
    </div>
  );
}

export default NewsCard;
