"use client";

import clsx from "clsx";
import { HTMLProps } from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: HTMLProps<HTMLButtonElement>["className"];
  variant?: "primary" | "secondary" | "outline" | "ghost" | "icon" | "no-anni";
  disabled?: HTMLProps<HTMLButtonElement>["disabled"];
  loading?: boolean;
  icon?: React.ReactNode;
  title?: string;
  id?: HTMLProps<HTMLButtonElement>["id"];
  onClick?: () => void;
}

export const LoadingSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-loader-circle mr-2 h-4 w-4 animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    className,
    variant = "primary",
    onClick,
    disabled,
    loading,
    icon,
    title,
    id,
  } = props;

  const defaultCSS =
    "inline-flex duration-700 h-9 w-fit gap-2 font-bold uppercase cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-line px-4 py-2 text-sm ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-95";

  const renderCSS = () => {
    switch (variant) {
      case "primary": {
        const variantPrimaryCSS =
          "bg-primary/15 text-background hover:bg-primary/80 hover:text-black text-primary border-primary";
        return variantPrimaryCSS;
      }

      case "outline": {
        const variantOutlineCSS = "bg-transparent hover:bg-line";
        return variantOutlineCSS;
      }

      case "ghost": {
        const variantGhostCSS =
          "bg-transparent text-grays border-none hover:bg-line hover:text-primary";
        return variantGhostCSS;
      }

      case "icon": {
        const variantIconCSS =
          "bg-transparent text-text border-none hover:bg-hover hover:text-primary p-4 text-primary border-primary";
        return variantIconCSS;
      }

      case "secondary": {
        const variantNoAnniCSS =
          "bg-bid/15 hover:bg-bid/80 text-bid border-secondary hover:text-black";
        return variantNoAnniCSS;
      }

      default: {
        const variantDefaultCSS = "bg-text text-background hover:bg-text/80";
        return variantDefaultCSS;
      }
    }
  };

  const classes = clsx(defaultCSS, renderCSS(), className, {
    "!bg-white !text-black": loading,
  });

  return (
    <button
      id={id}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <LoadingSVG />}
      {icon && <span className="text-lg">{icon}</span>}
      {title && <span>{title}</span>}
      {children}
    </button>
  );
};

export default Button;
