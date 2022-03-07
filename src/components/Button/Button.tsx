import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export const Button = React.forwardRef(
  (
    props: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    const { text, className, ...rest } = props;
    return (
      <button
        className={`${className} bg-[#2AD8BF] text-white  h-auto disabled:bg-slate-500 py-2 px-5`}
        ref={ref}
        {...rest}
      >
        {text}
      </button>
    );
  }
);
