import type { ButtonHTMLAttributes } from 'react';

type SwitchProps = {
  options: string[];
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = SwitchProps & ButtonProps;

function Switch({ options = [] }: Props) {
  return (
    <div>
      {options.map((option: string) => (
        <span
          key={option}
          className="inline-block w-[100px] text-center border-zinc-300 rounded-sm cursor-pointer border-2 hover:border-sky-400 transition-colors capitalize py-1 -ml-[1px]"
        >
          {option}
        </span>
      ))}
    </div>
  );
}

export default Switch;
