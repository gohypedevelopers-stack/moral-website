import Link from "next/link";
import { notFound } from "next/navigation";
import ProductSizePicker from "@/components/ProductSizePicker";
import ShopProductGrid from "@/components/ShopProductGrid";
import SiteFooter from "@/components/SiteFooter";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import ProductGallery from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Fetch from Shopify using the handle
  const product = await getProductByHandle(id);
  
  if (!product) {
    notFound();
  }

  // Fetch all products for the "Related" section
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((item: any) => item.id !== product.id)
    .slice(0, 3);

  const sizes = product.variants
    ?.map((variant: any) => {
      const sizeOption = variant.selectedOptions?.find(
        (option: any) => option.name.toLowerCase() === "size"
      );
      return sizeOption?.value || variant.title;
    })
    .filter(Boolean) || ["S", "M", "L", "XL"];

  // Fallbacks for fields not in standard Shopify
  const origin = "Hand-finished with integrity.";
  const edition = "Permanent Collection.";
  const fabric = "Premium cloth selected for longevity and drape.";
  const fit = "Designed for permanence, not the season.";
  const care = "Wear often. Clean only when necessary.";
  const notes = ["Ethical production", "Premium hardware", "Conscience woven into the process"];

  return (
    <div className="product-page">
      {/* Background Stage mimicry */}
      <div className="stage" aria-hidden="true">
        <div className="stage__black" />
        <div className="stage__white" />
        <div className="stage__seam" />
      </div>


      <div className="prod-layout">
        {/* Left Side: Dark background with images */}
        <div className="prod-layout__left">
          <ProductGallery images={product.images || []} title={product.title} fallbackImage={product.src} />
        </div>

        {/* Right Side: Light background with details */}
        <div className="prod-layout__right">
          <div className="prod-details">
            <span className="prod-details__sub-label">{product.sub.toUpperCase()}</span>
            <h1 className="prod-details__title">{product.title}</h1>
            <div className="prod-details__price">{product.price}</div>
            
            <p className="prod-details__description">{product.description || "A quiet rebellion against the disposable. Garments built to be kept, considered, and worn with intention."}</p>

            <ProductSizePicker sizes={sizes} variants={product.variants} />

            <div className="prod-details__shipping-note">
              COMPLIMENTARY WORLDWIDE SHIPPING ON ALL ORDERS.
            </div>

            <hr className="prod-details__divider" />

            <div className="prod-details__info-grid">
              <div className="prod-details__info-col">
                <span className="info-label">ORIGIN</span>
                <p className="info-val">{origin}</p>
              </div>
              <div className="prod-details__info-col">
                <span className="info-label">EDITION</span>
                <p className="info-val">{edition}</p>
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
            src={product.src} 
            alt={product.title} 
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
            <p>{fabric}</p>
          </article>
          <article className="prod-craft__panel">
            <span>FIT</span>
            <p>{fit}</p>
          </article>
          <article className="prod-craft__panel">
            <span>CARE</span>
            <p>{care}</p>
          </article>
        </div>
      </section>

      <section className="prod-archive">
        <div className="prod-archive__media">
          <img src={product.images?.[1] || product.src} alt={`${product.title} detail`} />
        </div>
        <div className="prod-archive__content">
          <span className="prod-philosophy__label">ARCHIVE NOTES</span>
          <h2>{edition}</h2>
          <ul>
            {notes.map((note) => (
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
          <ShopProductGrid products={relatedProducts} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
