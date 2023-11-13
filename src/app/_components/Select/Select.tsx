'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

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
  const [currentValue, setCurrentValue] = useState(placeholder);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [currentValue, onChange]);

  useEffect(() => {
    if (valueSelected) {
      setCurrentValue(valueSelected);
    }
  }, [valueSelected]);

  return (
    <div
      className="relative cursor-pointer border border-black py-2 px-4 rounded-md select-none"
      onClick={() => setShow(!show)}
    >
      <div className="flex items-center justify-between">
        <span className="capitalize">{currentValue}</span>
        {show ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div
        className={`absolute w-full top-[43px] left-0 bg-white [&>span]:select-none shadow-md ${
          !show ? 'hidden' : ''
        }`}
      >
        {options.map(({ key, value, iconUrl }) => (
          <span
            key={key}
            className={`w-full h-10 flex items-center hover:bg-sky-100 hover:text-black p-4 transition-colors capitalize ${
              value === currentValue ? 'bg-sky-100' : ''
            }    `}
            onClick={() => setCurrentValue(key)}
          >
            {iconUrl && (
              <Image
                className="mr-2"
                src={iconUrl}
                width={20}
                height={20}
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
