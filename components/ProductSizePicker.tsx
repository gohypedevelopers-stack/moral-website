"use client";

import { useState } from "react";

interface ProductSizePickerProps {
  sizes: string[];
}

export default function ProductSizePicker({ sizes }: ProductSizePickerProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0] ?? "");

  return (
    <div className="prod-details__size-section">
      <div className="prod-details__size-header">
        <button className="prod-details__size-guide" type="button">
          SIZE GUIDE
        </button>
      </div>

      <div className="prod-details__size-grid" role="radiogroup" aria-label="Select size">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selectedSize === size}
            className={`prod-details__size-btn ${selectedSize === size ? "active" : ""}`}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
