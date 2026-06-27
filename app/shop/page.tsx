import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import { getProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="editorial-page editorial-page--light">
      <section className="editorial-hero editorial-hero--split">
        <div>
          <span className="label">Shop</span>
          <h1>The Foundation</h1>
        </div>
        <div>
          <p>Numbered garments built for daily wear, long ownership, and quiet permanence.</p>
        </div>
      </section>
      <section className="page-product-grid">
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
            <AddToCartButton variantId={product.variantId} className="prod-related__atc">
              Add to Cart
            </AddToCartButton>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
