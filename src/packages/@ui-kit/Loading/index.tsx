import React, { useState } from "react";
import ReactDOM from "react-dom";

export interface LoadingProps {
  isShow: boolean;
}

const LoadingHeader: React.FC<LoadingProps> = (props) => {
  const { isShow } = props;

  return isShow
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div
            style={{
              position: "fixed",
              width: "100vw",
              top: "0",
              right: "0",
              left: "0",
              zIndex: "50",
              height: "2px",
            }}
            className="loader"
          ></div>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default LoadingHeader;
