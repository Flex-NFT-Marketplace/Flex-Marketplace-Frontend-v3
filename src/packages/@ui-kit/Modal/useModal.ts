"use client"
import { useState } from "react";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const toggle = () => {
    setIsShow((prev) => !prev);
  };

  return { isShow, toggle };
};
