"use client";

import clsx from "clsx";
import { HTMLProps, useState } from "react";

interface TextAreaProps {
  className?: HTMLProps<HTMLElement>["className"];
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  type?: HTMLProps<HTMLElement>["type"];
  disabled?: boolean;
  name?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const {
    className,
    placeholder,
    value,
    onChange,
    disabled,
    name,
    rows = 4,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const classes = clsx(
    "flex items-center gap-4 border px-4 transition-all font-normal hover:border-primary",
    {
      "border-primary": isFocus,
      "border-stroke": !isFocus,
    },
    className
  );

  return (
    <textarea
      rows={rows}
      className={`w-full rounded-md bg-transparent py-1 text-sm outline-none placeholder:text-grays ${classes}`}
      value={value}
      name={name}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    />
  );
};

export default TextArea;
