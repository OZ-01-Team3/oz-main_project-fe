'use client';
import React from 'react';
type InputProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBluer?: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  type?: 'text' | 'number' | 'password' | 'email' | 'tel';
  placeholder?: string;
  min?: string | number;
  ref?: React.RefCallback<HTMLInputElement>;
};

// eslint-disable-next-line react/display-name
const AuthInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ children, value, onChange, type, placeholder, min, name, onBluer }, ref) => {
    return (
      <div className="relative mt-6">
        <label className="absolute -top-2 left-2 inline-block bg-mainBlack px-1 text-base font-semibold text-mainWite">
          {children}
        </label>
        <input
          className="block w-full h-12 rounded-lg border-0 py-1.5 text-mainWhite shadow-sm ring-1 ring-inset ring-mainWhite ring-gray-300 placeholder:text-subGray focus:ring-2 focus:ring-inset focus:ring-mainWhite sm:text-sm sm:leading-6 bg-transparent"
          value={value}
          onChange={onChange}
          type={type}
          required
          placeholder={placeholder}
          min={min}
          name={name}
          onBlur={onBluer}
          ref={ref}
        />
      </div>
    );
  }
);

export default AuthInput;
