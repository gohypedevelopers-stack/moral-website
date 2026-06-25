import HomeClient from "@/components/HomeClient";
import { getProducts, getHeroVideoUrl } from "@/lib/shopify";

export default async function Home() {
  const shopifyProducts = await getProducts();
  const heroVideoUrl = await getHeroVideoUrl();
  
  // We'll use the first 5 products for the featured rail, 
  // and the rest for the "All Products" section.
  const featuredProducts = shopifyProducts.slice(0, 5);
  const allProducts = shopifyProducts.slice(5) || shopifyProducts;

  return (
    <HomeClient products={featuredProducts} allProducts={allProducts} heroVideoUrl={heroVideoUrl} />
  );
}
