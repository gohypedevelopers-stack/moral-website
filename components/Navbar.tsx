"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

type NavCollection = {
  id: string;
  title: string;
  href?: string;
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [collections, setCollections] = useState<NavCollection[]>([]);
  const pathname = usePathname();
  const isDarkGlassPage = pathname.startsWith("/product");
  const { cartCount, setIsCartOpen } = useCart();
  const categoryLinks = collections.length > 0
    ? collections
    : [
        { id: "men", title: "Men", href: "/shop?collection=men" },
        { id: "women", title: "Women", href: "/shop?collection=women" },
        { id: "essentials", title: "Essentials", href: "/shop?collection=essentials" },
        { id: "limited-edition", title: "Limited Edition", href: "/shop?collection=limited-edition" },
      ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    if (!domain || !token) return;

    let cancelled = false;
    fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({
        query: `
          query getNavCollections {
            collections(first: 20) {
              edges {
                node {
                  title
                  handle
                }
              }
            }
          }
        `,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (cancelled) return;
        const fetchedCollections = result.data?.collections?.edges?.map(({ node }: any) => ({
          id: node.handle,
          title: node.title,
          href: `/shop?collection=${encodeURIComponent(node.handle)}`,
        })) || [];
        setCollections(fetchedCollections);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Journal", href: "/journal" },
  ];

  const isLightPage = pathname === "/shop" || pathname.startsWith("/journal");

  return (
    <>
      <header className={`nav ${isDarkGlassPage ? "nav--dark-glass" : ""} ${isLightPage ? "nav--light" : ""} ${isScrolled ? "nav--scrolled" : ""}`} id="nav">
        <Link className="nav__brand" href="/" aria-label="MORAL">
          <img className="nav__logo" src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png" alt="MORAL" />
        </Link>
        <nav className="nav__links">
          <Link href="/shop">Shop</Link>
          <div className="nav__dropdown">
            <Link href="/shop" className="nav__dropdown-trigger" aria-haspopup="true">
              Category
            </Link>
            <div className="nav__dropdown-menu">
              {categoryLinks.map((collection) => (
                <Link key={collection.id} href={collection.href || `/shop?collection=${collection.id}`}>
                  {collection.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about">About</Link>
          <Link href="/journal">Journal</Link>
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
        {navLinks.map((link, index) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: `${0.18 + index * 0.06}s` }}
          >
            {link.label}
          </Link>
        ))}
        {categoryLinks.map((collection, index) => (
          <Link
            key={collection.id}
            href={collection.href || `/shop?collection=${collection.id}`}
            onClick={() => setMenuOpen(false)}
            style={{ transitionDelay: `${0.36 + index * 0.04}s` }}
          >
            {collection.title}
          </Link>
        ))}
        <div className="drawer__foot">
          <span>MORAL</span>
          <a href="https://www.instagram.com/moral_nyc?igsh=bGdnbDM4MmdtNDVv" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </>
  );
}