import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import AddToCartButton from "@/components/AddToCartButton";
import ShopProductGrid from "@/components/ShopProductGrid";
import { getProducts, getProductsByCollection } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const selectedCollection = Array.isArray(params.collection)
    ? params.collection[0]
    : params.collection;

  const collectionResult = selectedCollection
    ? await getProductsByCollection(selectedCollection)
    : null;
  const products = collectionResult ? collectionResult.products : await getProducts();
  const pageTitle = collectionResult?.collection?.title || "The Foundation";
  const pageLabel = collectionResult?.collection ? "Collection" : "Shop";

  return (
    <main className="editorial-page editorial-page--light">
      <section className="editorial-hero editorial-hero--split">
        <div>
          <span className="label">{pageLabel}</span>
          <h1>{pageTitle}</h1>
        </div>
        <div>
          <p>Numbered garments built for daily wear, long ownership, and quiet permanence.</p>
        </div>
      </section>
      <section className="page-product-grid">
        <ShopProductGrid products={products} />
      </section>
      <SiteFooter />
    </main>
  );
}
