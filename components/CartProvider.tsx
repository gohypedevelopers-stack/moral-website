"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { addCartItem, fetchCart } from "@/app/actions";

type CartContextType = {
  cartId: string | null;
  cartCount: number;
  checkoutUrl: string | null;
  addItemToCart: (variantId: string) => Promise<void>;
  isLoading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCartId = localStorage.getItem("shopify_cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
      // Fetch cart to get latest count and checkout URL
      fetchCart(storedCartId).then((cart) => {
        if (cart) {
          setCartCount(cart.totalQuantity);
          setCheckoutUrl(cart.checkoutUrl);
        } else {
          // Cart might have expired or been completed
          localStorage.removeItem("shopify_cart_id");
          setCartId(null);
        }
      });
    }
    setIsLoading(false);
  }, []);

  const addItemToCart = async (variantId: string) => {
    try {
      const cart = await addCartItem(cartId, variantId);
      if (cart) {
        setCartId(cart.id);
        setCartCount(cart.totalQuantity);
        setCheckoutUrl(cart.checkoutUrl);
        localStorage.setItem("shopify_cart_id", cart.id);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartId, cartCount, checkoutUrl, addItemToCart, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
