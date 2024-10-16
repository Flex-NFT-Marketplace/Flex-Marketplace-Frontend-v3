"use client";

import React, { useState } from "react";
import { createContext, useContext } from "react";
import CartPopup from "../../components/Cart";

interface ICartContext {
  cart: any[];
  toggleCart: () => void;
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
}

export const CardContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isShowing, setIsShowing] = useState(false);

  const toggleCart = () => {
    setIsShowing(!isShowing);
  };

  const value = {
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    toggleCart,
  };

  return (
    <CardContext.Provider value={value}>
      <CartPopup isShowing={isShowing} setIsShowing={setIsShowing} />
      {children}
    </CardContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
