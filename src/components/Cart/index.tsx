"use client";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

interface ICartPopupProps {
  isShowing: boolean;
  setIsShowing: (isShowing: boolean) => void;
}

const CartPopup: React.FC<ICartPopupProps> = (props) => {
  const { setIsShowing, isShowing } = props;

  const onHide = () => {
    setIsShowing(false);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="fixed inset-0 z-20 h-screen w-screen animate-fade bg-black/80 transition-all "
            onClick={onHide}
          />
          <div className="fixed bottom-0 right-0 top-0 z-50 border border-stroke bg-black px-5 py-8">
            <div className="w-[465px] bg-black">
              <p>sssss</p>
            </div>
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default CartPopup;
