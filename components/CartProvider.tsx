"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { addCartItem, fetchCart, removeCartItem, updateCartItemQuantity } from "@/app/actions";

type CartContextType = {
  cart: any | null;
  cartId: string | null;
  cartCount: number;
  checkoutUrl: string | null;
  addItemToCart: (variantId: string) => Promise<void>;
  removeItemFromCart: (lineId: string) => Promise<void>;
  updateItemQuantity: (lineId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCartId = localStorage.getItem("shopify_cart_id");
    if (storedCartId) {
      setCartId(storedCartId);
      fetchCart(storedCartId).then((fetchedCart) => {
        if (fetchedCart) {
          setCart(fetchedCart);
          setCartCount(fetchedCart.totalQuantity);
          setCheckoutUrl(fetchedCart.checkoutUrl);
        } else {
          localStorage.removeItem("shopify_cart_id");
          setCartId(null);
        }
      });
    }
    setIsLoading(false);
  }, []);

  const addItemToCart = async (variantId: string) => {
    try {
      setIsCartOpen(true); // Open cart automatically
      const updatedCart = await addCartItem(cartId, variantId);
      if (updatedCart) {
        setCart(updatedCart);
        setCartId(updatedCart.id);
        setCartCount(updatedCart.totalQuantity);
        setCheckoutUrl(updatedCart.checkoutUrl);
        localStorage.setItem("shopify_cart_id", updatedCart.id);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  const removeItemFromCart = async (lineId: string) => {
    if (!cartId) return;
    try {
      const updatedCart = await removeCartItem(cartId, lineId);
      if (updatedCart) {
        setCart(updatedCart);
        setCartCount(updatedCart.totalQuantity);
        setCheckoutUrl(updatedCart.checkoutUrl);
      }
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };


  const updateItemQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    try {
      const updatedCart = await updateCartItemQuantity(cartId, lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
        setCartCount(updatedCart.totalQuantity);
        setCheckoutUrl(updatedCart.checkoutUrl);
      }
    } catch (err) {
      console.error("Failed to update cart quantity:", err);
    }
  };
  return (
    <CartContext.Provider value={{ cart, cartId, cartCount, checkoutUrl, addItemToCart, removeItemFromCart, updateItemQuantity, isLoading, isCartOpen, setIsCartOpen }}>
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
