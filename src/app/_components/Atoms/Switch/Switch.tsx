import { useState } from 'react';

type SwitchProps = {
  active: string;
  options: string[];
  onChange?: (value: string) => void;
};

type Props = SwitchProps;

function Switch({ active, options = [], onChange }: Props) {
  const handleSelect = (value: string) => {
    onChange && onChange(value);
  };

  return (
    <div>
      {options.map((option: string) => {
        console.log(option, option === active);
        return (
          <span
            key={option}
            className={`${
              option === active ? 'border-sky-400' : 'border-zinc-300'
            } inline-block w-[100px] text-center  rounded-sm cursor-pointer border-2 hover:border-sky-400 transition-colors capitalize py-1 -ml-[1px]`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </span>
        );
      })}
    </div>
  );
}

export default Switch;
