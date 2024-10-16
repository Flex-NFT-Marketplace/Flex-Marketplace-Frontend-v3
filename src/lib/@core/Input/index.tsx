"use client";

import clsx from "clsx";
import { HTMLProps, useState } from "react";

interface IInputProps {
  className?: HTMLProps<HTMLElement>["className"];
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  type?: HTMLProps<HTMLElement>["type"];
  disabled?: boolean;
  id?: string;
  name?: string;
  min?: string;
  accept?: string;
}

const Input: React.FC<IInputProps> = (props) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    type = "text",
    disabled,
    id,
    name,
    min,
    accept,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const classes = clsx(
    "flex h-8 items-center gap-4 border px-4 transition-all font-normal",
    {
      "border-primary": isFocus,
      "border-stroke": !isFocus,
    },
    className,
  );

  return (
    <div className={classes}>
      <input
        id={id}
        name={name}
        className="h-full w-full bg-transparent text-sm outline-none placeholder:text-grays"
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        min={min}
        accept={accept}
      />
    </div>
  );
};

export default Input;
