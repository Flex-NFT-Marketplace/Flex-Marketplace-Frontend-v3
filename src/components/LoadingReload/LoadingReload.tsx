"use client";
import ImageKit from "@/packages/@ui-kit/Image";
import React, { useEffect, useState } from "react";
import logo_flex from "../../../public/logo-flex.svg";

const LoadingReload = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsHidden(true);
    };

    if (document.readyState === "complete") {
      setIsHidden(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div id="loading-overlay" className={isHidden ? "hidden" : ""}>
      <div className="fixed w-screen h-screen bg-black top-0 left-0 z-50 flex items-center justify-center">
        <ImageKit
          src={logo_flex.src}
          className="animate-show-loading w-[25%]"
        />
      </div>
    </div>
  );
};

export default LoadingReload;
