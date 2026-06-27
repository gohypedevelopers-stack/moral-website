"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDarkGlassPage = pathname === "/shop" || pathname.startsWith("/product");
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Campaign", href: "#" },
    { label: "Journal", href: "#" },
  ];

  return (
    <>
      <header className={`nav ${isDarkGlassPage ? "nav--dark-glass" : ""}`} id="nav">
        <Link className="nav__brand" href="/" aria-label="MORAL">
          <img className="nav__logo" src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png" alt="MORAL" />
        </Link>
        <nav className="nav__links">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav__right">
          <button className="nav__cart" onClick={() => setIsCartOpen(true)}>
            Cart ({cartCount})
          </button>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="drawer" id="drawer">
        {navLinks.concat({ label: "Newsletter", href: "/newsletter" }).map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: `${0.18 + index * 0.06}s` }}
          >
            {link.label}
          </Link>
        ))}
        <div className="drawer__foot">
          <span>Est. MMXXV</span>
          <span>Instagram</span>
        </div>
      </div>
    </>
  );
}
