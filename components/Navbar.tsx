"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isProductPage = pathname.startsWith("/product");

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Shop", hash: "collection" },
    { label: "About", hash: "philosophy" },
    { label: "Campaign", hash: "campaign" },
    { label: "Journal", hash: "community" },
  ];

  return (
    <>
      <header className={`nav ${isProductPage ? "nav--dark-glass" : ""}`} id="nav">
        <Link className="nav__brand" href="/" aria-label="MORAL">
          <img className="nav__logo" src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png" alt="MORAL" />
        </Link>
        <nav className="nav__links">
          {navLinks.map((link) => (
            <Link key={link.hash} href={isHome ? `#${link.hash}` : `/#${link.hash}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav__right">
          <a className="nav__cart" href="#">
            Cart (0)
          </a>
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
        {navLinks.concat({ label: "Newsletter", hash: "news" }).map((link, index) => (
          <Link
            key={link.hash}
            href={isHome ? `#${link.hash}` : `/#${link.hash}`}
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
