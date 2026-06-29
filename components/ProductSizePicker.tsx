"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/CartProvider";

type ProductVariant = {
  id: string;
  title: string;
  availableForSale?: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
};

interface ProductSizePickerProps {
  sizes: string[];
  variants?: ProductVariant[];
}

function getVariantSize(variant: ProductVariant) {
  const sizeOption = variant.selectedOptions.find(
    (option) => option.name.toLowerCase() === "size"
  );

  return sizeOption?.value || variant.title;
}

export default function ProductSizePicker({ sizes, variants = [] }: ProductSizePickerProps) {
  const { addItemToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const sizeOptions = useMemo(() => {
    const variantSizes = variants.map((variant) => ({
      label: getVariantSize(variant),
      variantId: variant.id,
      availableForSale: variant.availableForSale !== false,
    }));

    if (variantSizes.length > 0) {
      return variantSizes;
    }

    return sizes.map((size) => ({
      label: size,
      variantId: "",
      availableForSale: true,
    }));
  }, [sizes, variants]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.label ?? "");
  const selectedOption = sizeOptions.find((size) => size.label === selectedSize) || sizeOptions[0];

  const handleAddToBag = async () => {
    if (!selectedOption?.variantId || isAdding) return;

    setIsAdding(true);
    await addItemToCart(selectedOption.variantId);
    setIsAdding(false);
  };

  return (
    <>
      <div className="prod-details__size-section">
        <div className="prod-details__size-header">
          <button className="prod-details__size-guide" type="button">
            SIZE GUIDE
          </button>
        </div>

        <div className="prod-details__size-grid" role="radiogroup" aria-label="Select size">
          {sizeOptions.map((size) => (
            <button
              key={`${size.label}-${size.variantId}`}
              type="button"
              role="radio"
              aria-checked={selectedSize === size.label}
              disabled={!size.availableForSale}
              className={`prod-details__size-btn ${selectedSize === size.label ? "active" : ""}`}
              onClick={() => setSelectedSize(size.label)}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="prod-details__atb-btn"
        onClick={handleAddToBag}
        disabled={isAdding || !selectedOption?.variantId || !selectedOption?.availableForSale}
        aria-label={isAdding ? "Adding to Bag" : "Add to Bag"}
      >
        {isAdding ? "ADDING..." : selectedOption?.availableForSale === false ? "SOLD OUT" : "ADD TO BAG"}
      </button>
    </>
  );
}