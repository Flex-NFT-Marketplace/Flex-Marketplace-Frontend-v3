import { createContext, useContext } from "react";

interface BuyNFTContextType {}

const BuyNFTContext = createContext<BuyNFTContextType | undefined>(undefined);

export const BuyNFTProvider = ({ children }: { children: React.ReactNode }) => {
  const value = {};

  

  return (
    <BuyNFTContext.Provider value={value}>{children}</BuyNFTContext.Provider>
  );
};

const useBuyNFTContext = () => {
  const context = useContext(BuyNFTContext);
  if (!context) {
    throw new Error("useBuyNFTContext must be used within a BuyNFTProvider");
  }
  return context;
};
