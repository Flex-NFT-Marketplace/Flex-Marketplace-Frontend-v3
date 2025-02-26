"use client";
import { createContext, useContext, useEffect, useState } from "react";
import LoadingHeader from ".";

interface LoadingContextType {
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  // handle Popup
  const [isShow, setIsShow] = useState(false);

  const setLoading = (isLoading: boolean) => {
    setIsShow(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {/* <LoadingHeader isShow={isShow}></LoadingHeader> */}
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useNotify must be used within a LoadingContext");
  }
  return context;
};

export default LoadingProvider;
