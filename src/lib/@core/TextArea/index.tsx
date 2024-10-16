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
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { className, placeholder, value, onChange, disabled, name } = props;
  const [isFocus, setIsFocus] = useState(false);
  const classes = clsx(
    "flex items-center gap-4 border px-4 transition-all font-normal",
    {
      "border-primary": isFocus,
      "border-stroke": !isFocus,
    },
    className,
  );

  return (
    <textarea
      className={`w-full bg-transparent py-1 text-sm outline-none placeholder:text-grays ${classes}`}
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
