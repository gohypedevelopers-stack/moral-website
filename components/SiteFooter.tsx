"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type FooterCollection = {
  id: string;
  title: string;
  href?: string;
};

export default function SiteFooter() {
  const [collections, setCollections] = useState<FooterCollection[]>([]);

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
          query getFooterCollections {
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

  const categoryLinks = collections.length > 0
    ? collections
    : [
        { id: "men", title: "Men", href: "/shop?collection=men" },
        { id: "women", title: "Women", href: "/shop?collection=women" },
        { id: "essentials", title: "Essentials", href: "/shop?collection=essentials" },
        { id: "limited-edition", title: "Limited Edition", href: "/shop?collection=limited-edition" },
      ];

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/assets/81783374-d384-4d9a-9e94-6c2b3eeef1aa.png"
            alt="MORAL"
          />
          <p>
            Built on conviction. Designed for permanence. Worn with intention.
          </p>
        </div>
        <div className="footer__col">
          <h5>Shop</h5>
          <ul>
            <li>
              <Link href="/shop">New Arrivals</Link>
            </li>
            {categoryLinks.map((collection) => (
              <li key={collection.id}>
                <Link href={collection.href || `/shop?collection=${collection.id}`}>
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__col">
          <h5>Company</h5>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Connect</h5>
          <ul>
            <li>
              <a href="https://www.instagram.com/moral_nyc?igsh=bGdnbDM4MmdtNDVv" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 MōRAL. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Shipping</a>
        </div>
      </div>
    </footer>
  );
}

