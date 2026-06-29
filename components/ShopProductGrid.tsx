"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import AddToCartButton from "@/components/AddToCartButton";

export default function ShopProductGrid({ products }: { products: any[] }) {
  const { addItemToCart, setIsCartOpen } = useCart();
  const [openSizeProductId, setOpenSizeProductId] = useState<string | null>(null);

  const getProductSizeOptions = (product: any) => {
    const variants = product.variants?.length
      ? product.variants
      : product.variantId
        ? [{ id: product.variantId, title: "Default", availableForSale: true }]
        : [];

    return variants.map((variant: any) => ({
      label: variant.selectedOptions?.find((opt: any) => opt.name === "Size")?.value || variant.title || "Default",
      variantId: variant.id,
      availableForSale: variant.availableForSale !== false,
    }));
  };

  const handleCardAdd = (product: any) => {
    const sizeOptions = getProductSizeOptions(product);

    if (sizeOptions.length <= 1) {
      const onlyOption = sizeOptions[0];
      if (onlyOption?.variantId && onlyOption.availableForSale) {
        addItemToCart(onlyOption.variantId);
        setIsCartOpen(true);
      }
      return;
    }

    setOpenSizeProductId((currentId) => (currentId === product.id ? null : product.id));
  };

  const handleCardSizeAdd = (variantId: string) => {
    addItemToCart(variantId);
    setOpenSizeProductId(null);
    setIsCartOpen(true);
  };

  if (!products || products.length === 0) {
    return (
      <div className="shop-empty">
        <h2>No products found.</h2>
        <p>This collection is empty or is not published to the Storefront API yet.</p>
        <Link href="/shop">View all products</Link>
      </div>
    );
  }

  return (
    <>
      {products.map((product: any) => (
        <div className="prod-related__card" key={product.id}>
          <Link href={`/product/${product.id}`} style={{ display: "block", color: "inherit" }}>
            <div className="prod-related__image">
              <img src={product.src} alt={product.title} />
            </div>
            <div className="prod-related__meta">
              <div>
                <h3>{product.title}</h3>
                <span>{product.sub}</span>
              </div>
              <strong>{product.price}</strong>
            </div>
          </Link>
          <button
            className="prod-related__atc"
            aria-label={`Choose size for ${product.title}`}
            onClick={() => handleCardAdd(product)}
          >
            Add to Cart
          </button>
          {openSizeProductId === product.id ? (
            <div className="card__sizes" role="radiogroup" aria-label={`Choose size for ${product.title}`}>
              {getProductSizeOptions(product).map((size: any) => (
                <button
                  key={`${product.id}-${size.label}-${size.variantId}`}
                  type="button"
                  disabled={!size.availableForSale}
                  onClick={() => handleCardSizeAdd(size.variantId)}
                >
                  {size.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
}
