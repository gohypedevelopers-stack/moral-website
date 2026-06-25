"use server";

import { createCart, addToCart, getCart, removeFromCart } from "@/lib/shopify";

export async function addCartItem(cartId: string | null, variantId: string) {
  if (!cartId) {
    const cart = await createCart(variantId);
    return cart;
  }
  
  const cart = await addToCart(cartId, variantId);
  return cart;
}

export async function removeCartItem(cartId: string, lineId: string) {
  const cart = await removeFromCart(cartId, [lineId]);
  return cart;
}

export async function fetchCart(cartId: string) {
  return await getCart(cartId);
}
