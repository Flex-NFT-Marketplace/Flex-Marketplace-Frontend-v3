"use client";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./style.css";

interface IModalProps {
  isShow: boolean;
  hide: () => void;
  children: React.ReactNode;
  className?: string;
}

const ModalV2: React.FC<IModalProps> = (props) => {
  const { children, isShow, hide, className } = props;
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
    "fixed left-[50%] top-[50%] z-50 bg-popup !translate-x-[-50%] !translate-y-[-50%] gap-4 shadow-lg duration-200 max-w-[90%]";
  const animationClass = isShow ? "animate-fade-in" : "animate-fade-out";

  const classes = clsx(defaultCSS, animationClass, className);

  return shouldRender
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            data-state={isShow ? "open" : "closed"}
            className="fixed inset-0 z-50 bg-background/50 backdrop-blur-sm data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
            onClick={hide}
          />
          <div
            role="dialog"
            data-state={isShow ? "open" : "closed"}
            className={classes}
            onAnimationEnd={handleAnimationEnd}
          >
            {children}
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalV2;
