"use client";

import { useEffect } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    cartCount,
    checkoutUrl,
    isCartOpen,
    setIsCartOpen,
    removeItemFromCart,
    updateItemQuantity,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  const lines = cart?.lines?.edges || [];
  const subtotal = cart?.cost?.subtotalAmount?.amount || "0.00";
  const currencyCode = cart?.cost?.subtotalAmount?.currencyCode || "USD";

  return (
    <div className={`cart-drawer-overlay${isCartOpen ? " is-open" : ""}`} aria-hidden={!isCartOpen}>
      <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer" role="dialog" aria-modal="true" aria-label="Cart">
        <div className="cart-drawer__header">
          <h2>CART ({cartCount})</h2>
          <button className="cart-drawer__close" onClick={() => setIsCartOpen(false)} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__content">
          {lines.length === 0 ? (
            <div className="cart-drawer__empty">
              <p>Your cart is empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="cart-drawer__continue">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {lines.map(({ node }: any) => {
                const product = node.merchandise.product;
                const image = product.images.edges[0]?.node;
                const linePrice = parseFloat(node.merchandise.price.amount) * node.quantity;

                return (
                  <div key={node.id} className="cart-item">
                    <Link href={`/product/${product.handle}`} onClick={() => setIsCartOpen(false)} className="cart-item__image">
                      {image && <img src={image.url} alt={image.altText || product.title} />}
                    </Link>
                    <div className="cart-item__details">
                      <div className="cart-item__title-row">
                        <Link href={`/product/${product.handle}`} onClick={() => setIsCartOpen(false)}>
                          <h3>{product.title}</h3>
                        </Link>
                        <span className="cart-item__price">${linePrice.toFixed(2)}</span>
                      </div>
                      <p className="cart-item__variant">{node.merchandise.title}</p>
                      <div className="cart-item__actions">
                        <div className="cart-item__qty" aria-label={`Quantity for ${product.title}`}>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(node.id, node.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span>{node.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateItemQuantity(node.id, node.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button onClick={() => removeItemFromCart(node.id)} className="cart-item__remove">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {lines.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span>${parseFloat(subtotal).toFixed(2)} {currencyCode}</span>
            </div>
            <p className="cart-drawer__tax-note">Shipping and taxes calculated at checkout.</p>
            {checkoutUrl ? (
              <a href={checkoutUrl} className="cart-drawer__checkout">
                Checkout
              </a>
            ) : (
              <button disabled className="cart-drawer__checkout">
                Loading...
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}