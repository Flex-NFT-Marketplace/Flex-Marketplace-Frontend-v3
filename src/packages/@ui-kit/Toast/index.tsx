"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface IToastProps {
  isShow: boolean;
  hide: (isShow: boolean) => void;
  message: React.ReactNode;
}

const Toast: React.FC<IToastProps> = (props) => {
  const { message, isShow, hide } = props;
  const [shouldRender, setShouldRender] = useState(isShow);

  useEffect(() => {
    if (isShow) {
      setShouldRender(true);
    }
  }, [isShow]);

  const handleAnimationEnd = () => {
    if (!isShow) {
      setShouldRender(false);
    }
  };

  const defaultCSS =
    "fixed bottom-4 left-4 z-50 bg-line grid w-full transition-all max-w-lg gap-4 border border-line p-4 shadow-lg  sm:rounded-lg sm:max-w-[425px]";
  const animationClass = isShow ? "anni-item-show" : "anni-item-hide";

  const classes = clsx(defaultCSS, animationClass);

  return isShow
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            role="dialog"
            data-state={isShow ? "open" : "closed"}
            className={classes}
            // onAnimationEnd={handleAnimationEnd}
          >
            {message}
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Toast;
