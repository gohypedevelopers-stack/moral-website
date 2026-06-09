import Link from "next/link";
import ProductSizePicker from "@/components/ProductSizePicker";
import SiteFooter from "@/components/SiteFooter";

interface ProductData {
  id: string;
  tag?: string;
  title: string;
  sub: string;
  price: string;
  src: string;
  description: string;
  sizes: string[];
  origin: string;
  edition: string;
  perspectives: string[];
  fabric: string;
  fit: string;
  care: string;
  notes: string[];
}

const mockProducts: Record<string, ProductData> = {
  "prod-1": {
    id: "prod-1",
    tag: "New",
    title: "The Atelier Coat",
    sub: "Outerwear · The Foundation",
    price: "$1,850.00",
    src: "https://images.pexels.com/photos/35587808/pexels-photo-35587808.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    description: "A single conviction rendered in double-faced Italian cashmere. A quiet rebellion against the disposable. Designed for permanence, not the season.",
    sizes: ["XS", "S", "M", "L"],
    origin: "Hand-finished in Florence, Italy.",
    edition: "Numbered 017 of 100.",
    perspectives: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop"
    ],
    fabric: "Double-faced Italian cashmere with hand-set seams.",
    fit: "Relaxed shoulder, longline body, structured enough for tailoring.",
    care: "Brush between wears. Dry clean only when necessary.",
    notes: ["Horn button closure", "Unlined interior", "Hand-finished collar"]
  },
  "prod-2": {
    id: "prod-2",
    tag: "New",
    title: "Structured Wool Trouser",
    sub: "Tailoring · The Foundation",
    price: "$320.00",
    src: "https://images.pexels.com/photos/8505246/pexels-photo-8505246.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    description: "Crafted from dry-handle worsted wool with a structural drape. Tailored features include pressed creases, slant pockets, and a hidden adjustable waistband.",
    sizes: ["28", "30", "32", "34"],
    origin: "Tailored in Naples, Italy.",
    edition: "Numbered 042 of 150.",
    perspectives: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop"
    ],
    fabric: "Dry-handle worsted wool selected for clean drape.",
    fit: "Mid-rise with a straight leg and a quietly structured break.",
    care: "Steam to release creases. Dry clean sparingly.",
    notes: ["Pressed front crease", "Hidden adjustable waistband", "Double-stitched hem"]
  },
  "prod-3": {
    id: "prod-3",
    tag: "Best Seller",
    title: "Heavyweight Crew",
    sub: "Essentials · The Foundation",
    price: "$140.00",
    src: "https://images.pexels.com/photos/17590615/pexels-photo-17590615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    description: "Knitted from long-staple organic cotton. A dense loopback structure gives it warmth and shape that improves with age. Garment-dyed for a soft, worn-in patina.",
    sizes: ["S", "M", "L", "XL"],
    origin: "Knit in Barcelos, Portugal.",
    edition: "Numbered 289 of 500.",
    perspectives: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop"
    ],
    fabric: "Long-staple organic cotton in dense loopback knit.",
    fit: "Boxy through the body with a stable rib collar and cuffs.",
    care: "Cold wash inside out. Lay flat to dry.",
    notes: ["Garment-dyed finish", "Reinforced neck tape", "Dense rib trims"]
  },
  "prod-4": {
    id: "prod-4",
    title: "Raw Hem Denim",
    sub: "Denim · The Foundation",
    price: "$260.00",
    src: "https://images.pexels.com/photos/26274786/pexels-photo-26274786.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    description: "Fourteen-ounce Japanese selvedge denim. Left raw and untreated to record your daily life in custom fades. Finished with solid brass hardware.",
    sizes: ["30", "31", "32", "33", "34"],
    origin: "Woven in Kojima, Japan.",
    edition: "Numbered 102 of 200.",
    perspectives: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=600&auto=format&fit=crop"
    ],
    fabric: "Fourteen-ounce Japanese selvedge denim with solid brass hardware.",
    fit: "Straight leg with room through the thigh and a raw unfinished hem.",
    care: "Wear often before the first wash. Wash cold, hang dry.",
    notes: ["Raw hem", "Selvedge outseam", "Brass rivets"]
  },
  "prod-5": {
    id: "prod-5",
    tag: "Limited",
    title: "Cashmere Overshirt",
    sub: "Limited Edition · The Foundation",
    price: "$540.00",
    src: "https://images.pexels.com/photos/29923243/pexels-photo-29923243.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=1000",
    description: "An unlined shirt jacket style crafted from exceptionally soft cashmere. Designed with drop shoulders, clean horn buttons, and twin chest utility pockets.",
    sizes: ["S", "M", "L"],
    origin: "Finished in Biella, Italy.",
    edition: "Numbered 009 of 80.",
    perspectives: [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop"
    ],
    fabric: "Soft cashmere cloth with an unlined, shirt-jacket construction.",
    fit: "Easy drop shoulder with room for a fine knit underneath.",
    care: "Air between wears. Fold, do not hang, for storage.",
    notes: ["Twin utility pockets", "Clean horn buttons", "Unlined interior"]
  }
};

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Fallback to prod-1 if ID is not recognized
  const product = mockProducts[id] || mockProducts["prod-1"];
  const relatedProducts = Object.values(mockProducts)
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-page">
      {/* Background Stage mimicry */}
      <div className="stage" aria-hidden="true">
        <div className="stage__black" />
        <div className="stage__white" />
        <div className="stage__seam" />
      </div>

      {/* Back to Home Button floating on top */}
      <Link href="/" className="prod-back-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to Collection</span>
      </Link>

      <div className="prod-layout">
        {/* Left Side: Dark background with images */}
        <div className="prod-layout__left">
          <div className="prod-gallery">
            <div className="prod-gallery__main">
              <img src={product.src} alt={product.title} />
            </div>
            
            <div className="prod-gallery__details">
              <div className="prod-gallery__detail-cell">
                <img src={product.perspectives[0]} alt={`${product.title} Perspective 1`} />
              </div>
              <div className="prod-gallery__detail-cell">
                <img src={product.perspectives[1]} alt={`${product.title} Perspective 2`} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Light background with details */}
        <div className="prod-layout__right">
          <div className="prod-details">
            <span className="prod-details__sub-label">{product.sub.toUpperCase()}</span>
            <h1 className="prod-details__title">{product.title}</h1>
            <div className="prod-details__price">{product.price}</div>
            
            <p className="prod-details__description">{product.description}</p>

            <ProductSizePicker sizes={product.sizes} />

            <button className="prod-details__atb-btn">
              ADD TO BAG
            </button>

            <div className="prod-details__shipping-note">
              COMPLIMENTARY WORLDWIDE SHIPPING ON ALL ORDERS.
            </div>

            <hr className="prod-details__divider" />

            <div className="prod-details__info-grid">
              <div className="prod-details__info-col">
                <span className="info-label">ORIGIN</span>
                <p className="info-val">{product.origin}</p>
              </div>
              <div className="prod-details__info-col">
                <span className="info-label">EDITION</span>
                <p className="info-val">{product.edition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="prod-philosophy">
        <div className="prod-philosophy__content">
          <span className="prod-philosophy__label">THE PHILOSOPHY</span>
          <h2 className="prod-philosophy__title">
            Restraint as luxury.<br />
            <span className="italic-title">Designed once, worn for years.</span>
          </h2>
          <p className="prod-philosophy__text">
            The {product.title} represents our commitment to ethical permanence.
            We do not design for the trend cycle; we design for the archive.
            Every seam is double-stitched for structural integrity that matures with the wearer.
          </p>
        </div>
        <div className="prod-philosophy__media">
          <img 
            src="/assets/3a79aa51-9037-4ef6-a02b-03d23e7bc7f1.jpg" 
            alt="Tailoring craftsmanship" 
          />
        </div>
      </section>

      <section className="prod-craft">
        <div className="prod-craft__intro">
          <span className="prod-philosophy__label">THE MAKE</span>
          <h2>Construction you feel after the first year.</h2>
        </div>
        <div className="prod-craft__grid">
          <article className="prod-craft__panel prod-craft__panel--wide">
            <span>FABRIC</span>
            <p>{product.fabric}</p>
          </article>
          <article className="prod-craft__panel">
            <span>FIT</span>
            <p>{product.fit}</p>
          </article>
          <article className="prod-craft__panel">
            <span>CARE</span>
            <p>{product.care}</p>
          </article>
        </div>
      </section>

      <section className="prod-archive">
        <div className="prod-archive__media">
          <img src={product.perspectives[0]} alt={`${product.title} detail`} />
        </div>
        <div className="prod-archive__content">
          <span className="prod-philosophy__label">ARCHIVE NOTES</span>
          <h2>{product.edition}</h2>
          <ul>
            {product.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="prod-related">
        <div className="prod-related__header">
          <span className="prod-philosophy__label">COMPLETE THE FOUNDATION</span>
          <h2>Considered with this piece.</h2>
        </div>
        <div className="prod-related__grid">
          {relatedProducts.map((item) => (
            <Link href={`/product/${item.id}`} className="prod-related__card" key={item.id}>
              <div className="prod-related__image">
                <img src={item.src} alt={item.title} />
              </div>
              <div className="prod-related__meta">
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.sub}</span>
                </div>
                <strong>{item.price}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
