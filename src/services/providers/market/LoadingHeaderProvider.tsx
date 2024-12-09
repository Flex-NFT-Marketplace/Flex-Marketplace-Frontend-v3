"use client";
import { createContext, useState } from "react";

interface LoadingContextType {
  isLoadingHeader: boolean;
  setIsLoadingHeader: (isLoading: boolean) => void;
}

export const LoadingHeaderContext = createContext<LoadingContextType>({
  isLoadingHeader: false,
  setIsLoadingHeader: () => {},
});

const LoadingHeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoadingHeader, setIsLoadingHeader] = useState(false);

  return (
    <LoadingHeaderContext.Provider
      value={{ isLoadingHeader, setIsLoadingHeader }}
    >
      {children}
    </LoadingHeaderContext.Provider>
  );
};

export default LoadingHeaderProvider;
