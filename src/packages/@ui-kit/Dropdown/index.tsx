"use client";
import React, { HTMLProps, useEffect, useRef, useState } from "react";
import Button from "../Button";
import clsx from "clsx";
import DropdownItem from "./DropdownItem";
import "../styles/anni.css";

export interface DropdownProps {
  className?: HTMLProps<HTMLButtonElement>["className"];
  itemsUI?: any[];
  defaultValue?: any;
  onSelected: (index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { itemsUI, defaultValue, onSelected, className } = props;
  const dropdownRef = useRef<any>(null);

  const [isShowDropdown, setIsShowDropdown] = useState(false);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsShowDropdown(false);
    }
  };

  const handleSelected = (index: number) => {
    onSelected(index);
    setIsShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const defaultCSS =
    "relative inline-flex h-9 gap-2 uppercase cursor-pointer bg-background items-center justify-start whitespace-nowrap rounded-md border border-line px-3 py-2 text-sm ring-offset-background transition-colors  disabled:pointer-events-none disabled:opacity-50";
  const animationClass = isShowDropdown ? "anni-item-show" : "anni-item-hide";

  const classes = clsx(defaultCSS, className);

  const defaultCSSElement =
    "z-50 absolute top-9 left-0 grid mt-[1px] w-fit bg-background transition-all gap-1 rounded-md p-1 anni-item-show max-w-lg gap-1 border border-line p-1 shadow-lg sm:max-w-[425px] p-1";
  const classesElement = clsx(defaultCSSElement, animationClass);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={classes}
        onClick={() => setIsShowDropdown(() => !isShowDropdown)}
      >
        {defaultValue?.icon}
        <p className="whitespace-nowrap font-bold">{defaultValue?.title}</p>
      </button>

      {isShowDropdown && (
        <div className={classesElement}>
          {itemsUI?.map((item, index) => (
            <DropdownItem
              key={index}
              title={item.title}
              icon={item.icon}
              onClick={() => handleSelected(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
