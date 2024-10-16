import React, { HTMLProps } from "react";
import "./checkbox.css";
import clsx from "clsx";

export type CheckBoxType = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
  className?: HTMLProps<HTMLElement>["className"];
};

const Checkbox: React.FC<CheckBoxType> = (props) => {
  const { isChecked, onChange, className } = props;

  const handleCheckboxChange = () => {
    onChange(!isChecked);
  };

  const classes = clsx("container-checkbox", className);

  return (
    <label className={classes}>
      <input
        type="radio"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
