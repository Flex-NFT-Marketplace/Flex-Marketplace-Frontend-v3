import React from "react";
import ReactDOM from "react-dom";

interface IModalProps {
  isShowing: boolean;
  hide: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = (props) => {
  const { children, isShowing, hide } = props;

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            className="fixed left-0 right-0 top-0 z-20 h-screen w-screen animate-fade bg-black/80 transition-all animate-duration-200 animate-ease-in-out"
            onClick={hide}
          />
          <div className="fixed left-1/2 top-1/2 z-50 mx-auto w-full max-w-[95%] -translate-x-1/2 -translate-y-1/2 transform border border-stroke bg-black px-4 pb-4 pt-8 sm:p-2 md:max-w-[50%] lg:max-w-[30%]">
            {children}
          </div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default Modal;
