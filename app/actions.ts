"use server";

import { createCart, addToCart, getCart } from "@/lib/shopify";

export async function addCartItem(cartId: string | null, variantId: string) {
  if (!cartId) {
    const cart = await createCart(variantId);
    return cart;
  }
  
  const cart = await addToCart(cartId, variantId);
  return cart;
}

export async function fetchCart(cartId: string) {
  return await getCart(cartId);
}
