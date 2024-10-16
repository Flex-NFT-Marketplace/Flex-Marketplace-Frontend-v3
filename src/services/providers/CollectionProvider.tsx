"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ICollection } from "@/types/ICollection";
import useGetCollections from "../api/collection/useGetCollections";

interface CollectionContextType {
  collectionsBanner?: ICollection[];
  collectionTrending?: ICollection[];
  isFetching: boolean;
}

export const CollectionContext = createContext<
  CollectionContextType | undefined
>(undefined);

export const CollectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isFetching } = useGetCollections();
  const [collectionsBanner, setCollectionsBanner] = useState<ICollection[]>([]);
  const [collectionTrending, setCollectionTrending] = useState<ICollection[]>(
    [],
  );

  useEffect(() => {
    setCollectionsBanner(data?.banner || []);
    setCollectionTrending(data?.trending || []);
  }, [data]);

  const value = {
    collectionsBanner,
    collectionTrending,
    isFetching,
  };

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
      "useCollectionContext must be used within a CollectionProvider",
    );
  }
  return context;
};
