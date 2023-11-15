'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegCircleXmark } from 'react-icons/fa6';

type SelectProps = {
  placeholder: string;
  options: Array<{ key: string; value: string; iconUrl?: string }>;
  valueSelected?: string;
  onChange?: (value: string) => void;
};

function Select({
  placeholder,
  options = [],
  onChange,
  valueSelected,
}: SelectProps) {
  const [currentValue, setCurrentValue] = useState('');
  const [show, setShow] = useState(false);

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    setShow(false);
    onChange && onChange(value);
  };

  useEffect(() => {
    if (valueSelected) {
      setCurrentValue(valueSelected);
    }
  }, [valueSelected]);

  return (
    <div
      className="relative cursor-pointer border border-black py-2 px-4 rounded-md select-none dark:border-white dark:border"
      onClick={() => setShow(!show)}
    >
      <div className="flex items-center justify-between gap-1">
        <input
          id="category-id"
          type="text"
          className="capitalize outline-none cursor-pointer placeholder:text-black dark:text-gray-300 dark:placeholder-white dark:bg-transparent flex-1"
          placeholder={placeholder}
          defaultValue={currentValue}
          readOnly={true}
        />
        {currentValue && (
          <FaRegCircleXmark
            className="dark:text-gray-300"
            onClick={(e: Event) => {
              handleSelect('');
              e.stopPropagation();
            }}
          />
        )}
        {show ? (
          <FaChevronUp className="dark:text-gray-300" />
        ) : (
          <FaChevronDown className="dark:text-gray-300" />
        )}
      </div>
      <div
        className={`absolute w-full top-[43px] left-0 bg-white [&>span]:select-none shadow-md dark:bg-black dark:border ${
          !show ? 'hidden' : ''
        }`}
      >
        {options.map(({ key, value, iconUrl }) => (
          <span
            key={key}
            className={`w-full h-10 flex items-center hover:bg-gray-100 hover:text-black p-4 transition-colors capitalize ${
              value === currentValue
                ? 'bg-gray-100 dark:text-black'
                : 'dark:text-gray-300'
            }    `}
            onClick={() => handleSelect(key)}
          >
            {iconUrl && (
              <Image
                style={{ width: 'auto', height: 'auto' }}
                className="mr-2"
                src={iconUrl}
                width={15}
                height={15}
                alt={value}
              />
            )}
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Select;
