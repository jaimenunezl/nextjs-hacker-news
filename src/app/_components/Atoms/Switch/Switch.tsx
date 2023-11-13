import type { ButtonHTMLAttributes } from 'react';

type SwitchProps = {
  active: string;
  options: string[];
  onChange?: (value: string) => void;
};

type Props = SwitchProps;

function Switch({ active, options = [], onChange }: Props) {
  return (
    <div>
      {options.map((option: string) => (
        <span
          key={option}
          className={`${
            option === active ? 'border-sky-400' : ''
          } inline-block w-[100px] text-center border-zinc-300 rounded-sm cursor-pointer border-2 hover:border-sky-400 transition-colors capitalize py-1 -ml-[1px]`}
          onClick={() => onChange && onChange(option)}
        >
          {option}
        </span>
      ))}
    </div>
  );
}

export default Switch;
