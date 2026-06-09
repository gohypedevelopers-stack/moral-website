import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

const products = [
  {
    id: "prod-1",
    title: "The Atelier Coat",
    sub: "Outerwear · The Foundation",
    price: "$1,850.00",
    src: "https://images.pexels.com/photos/35587808/pexels-photo-35587808.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "prod-2",
    title: "Structured Wool Trouser",
    sub: "Tailoring · The Foundation",
    price: "$320.00",
    src: "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "prod-3",
    title: "Heavyweight Crew",
    sub: "Essentials · The Foundation",
    price: "$140.00",
    src: "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "prod-4",
    title: "Raw Hem Denim",
    sub: "Denim · The Foundation",
    price: "$260.00",
    src: "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
  {
    id: "prod-5",
    title: "Cashmere Overshirt",
    sub: "Limited Edition · The Foundation",
    price: "$540.00",
    src: "https://images.pexels.com/photos/29923243/pexels-photo-29923243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
  },
];

export default function ShopPage() {
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
        {products.map((product) => (
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
            <button className="prod-related__atc" aria-label={`Add ${product.title} to cart`}>
              Add to Cart
            </button>
          </div>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
