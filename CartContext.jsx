import React, { createContext, useContext, useState } from "react";

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to add a vehicle to the cart
  const addToCart = (vehicle) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === vehicle.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === vehicle.id ? { ...item, rentalDays: item.rentalDays + 1 } : item
        );
      }
      return [...prevCart, { ...vehicle, rentalDays: 1 }];
    });
  };

  // Function to remove a vehicle from the cart
  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to update rental days
  const updateRentalDays = (id, days) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, rentalDays: days } : item
      )
    );
  };

  // Function to calculate total cost
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.rentalDays, 0);
  };

  // Function to clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateRentalDays, calculateTotal, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
