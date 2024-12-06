"use client";

import { createContext, useContext } from "react";

interface CollectionContextType {}

export const CollectionContext = createContext<
  CollectionContextType | undefined
>(undefined);

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = {};

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error(
      "useCollectionContext must be used within a CollectionProvider"
    );
  }
  return context;
};
