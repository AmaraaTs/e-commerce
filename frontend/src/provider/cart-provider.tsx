"use client";

import { ICart } from "@/app/utils/interfaces";
import { apiUrl } from "@/app/utils/util";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Define ICartContext interface
export interface ICartContext {
  carts: ICart | null;
  setCarts: React.Dispatch<React.SetStateAction<ICart | null>>;
  getCartProducts: () => void;
}

// Create context with default values
export const CartContext = createContext<ICartContext>({
  carts: null,
  setCarts: () => {},
  getCartProducts: () => {},
});

// CartProvider component
const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCarts] = useState<ICart | null>(null); // Initialize carts state as null

  // Function to fetch cart products
  const getCartProducts = async () => {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        console.log("No user token found");
        return;
      }

      const response = await axios.get(`${apiUrl}/api/v1/cart/get-cart`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });

      if (response.status === 200) {
        console.log("API Response", response.data.cartProducts);
        setCarts(response.data.cartProducts); // Assuming cartProducts is an array of ICart
      }
    } catch (error) {
      console.log("Failed to fetch cart", error);
    }
  };

  // Fetch cart products on component mount
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <CartContext.Provider value={{ carts, setCarts, getCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
