import React, { HTMLProps, LegacyRef, ReactElement } from 'react';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  inputClass?: string;
  containerClass?: string;
  icon?: ReactElement
}

export const Input = React.forwardRef(
  (
    { label, containerClass, inputClass, icon: Icon, ...rest }: InputProps,
    ref: LegacyRef<HTMLInputElement> | undefined
  ): JSX.Element => {
    return (
      <div className={`relative flex flex-col py-3 ${containerClass||''}`}>
        {label && <label className="my-1 text-white">{label}</label>}
        {Icon}
        <input
          {...rest}
          ref={ref}
          className={`bg-[#FFFFFF0F] text-white outline-none p-2 ${inputClass||''}`}
          type="text"
        />
      </div>
    );
  }
);
