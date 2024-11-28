"use client";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface INotifyPopupProps {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
  message: string;
}

const NotifyPopup: React.FC<INotifyPopupProps> = (props) => {
  const { setIsShowing, isShowing, message } = props;

  const onHide = () => {
    setIsShowing(false);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="translate fixed left-[43%] top-4 z-50 flex -translate-x-1/2 animate-fade-down items-center gap-2 rounded-sm border border-primary bg-primary px-4 py-2 text-black transition-all">
            <div>
              <FaInfoCircle />
            </div>
            <p className="font-normal">{message}</p>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default NotifyPopup;
