import React, { HTMLProps, LegacyRef } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef(
  (
    { label, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ): JSX.Element => {
    return (
      <div className="flex flex-col py-3">
        <label className="my-1 text-white">{label}</label>
        <input
          {...rest}
          ref={ref}
          className="bg-[#FFFFFF0F] text-white outline-none p-2"
          type="text"
        />
      </div>
    );
  }
);
