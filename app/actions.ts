"use server";

import { createCart, addToCart, getCart, removeFromCart, updateCartLine } from "@/lib/shopify";

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

export async function updateCartItemQuantity(cartId: string, lineId: string, quantity: number) {
  if (quantity < 1) {
    return await removeFromCart(cartId, [lineId]);
  }

  return await updateCartLine(cartId, lineId, quantity);
}

export async function fetchCart(cartId: string) {
  return await getCart(cartId);
}
