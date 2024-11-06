"use client";
import React, { HTMLProps, forwardRef } from "react";
import clsx from "clsx";

export interface InputProps {
  className?: HTMLProps<HTMLInputElement>["className"];
  classContainer?: HTMLProps<HTMLInputElement>["className"];
  disabled?: HTMLProps<HTMLInputElement>["disabled"];
  placeholder?: string;
  title?: string;
  type?: HTMLProps<HTMLInputElement>["type"];
  icon?: React.ReactNode;
  onChange?: any;
  value?: HTMLProps<HTMLInputElement>["value"];
  name?: HTMLProps<HTMLInputElement>["name"];
  onFocus?: HTMLProps<HTMLInputElement>["onFocus"];
  onBlur?: HTMLProps<HTMLInputElement>["onBlur"];
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    onChange,
    disabled,
    title,
    icon,
    placeholder,
    classContainer,
    value,
    name,
    onFocus,
    onBlur,
  } = props;

  const defaultCSSContainer = "flex max-w-md flex-col gap-1.5";
  const classesContainer = clsx(defaultCSSContainer, classContainer);

  const defaultCSS =
    "h-9 flex rounded-md border border-line bg-background font-medium text-text hover:border-primary focus:border-primary gap-2 px-3 item-center";

  const classes = clsx(
    defaultCSS,
    {
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:border-line focus:border-line":
        disabled,
    },
    className
  );

  return (
    <div className={classesContainer}>
      {title && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {title}
        </label>
      )}

      <div className={classes}>
        {icon && (
          <div className="grid place-items-center text-grays">{icon}</div>
        )}
        <input
          ref={ref}
          className="h-full w-full border border-transparent bg-transparent py-2 font-bold outline-none placeholder:font-normal placeholder:text-white/50"
          disabled={disabled}
          type="text"
          placeholder={placeholder || "placeholder"}
          onChange={(e) => onChange(e)}
          value={value}
          name={name}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
