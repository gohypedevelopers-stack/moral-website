"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

interface AddToCartButtonProps {
  variantId: string;
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({ variantId, className = "", children }: AddToCartButtonProps) {
  const { addItemToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAdding) return;
    setIsAdding(true);
    await addItemToCart(variantId);
    setIsAdding(false);
  };

  return (
    <button 
      className={className} 
      onClick={handleAdd} 
      disabled={isAdding}
      aria-label={isAdding ? "Adding to Bag" : "Add to Bag"}
    >
      {isAdding ? "ADDING..." : (children || "ADD TO BAG")}
    </button>
  );
}
