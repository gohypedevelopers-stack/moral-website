const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch({ query, variables }: { query: string; variables?: any }) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      // Use Next.js fetch cache options if needed, but for now standard fetch
      cache: "no-store", 
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function getProducts() {
  const query = `
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            tags
            productType
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  const edges = response.body?.data?.products?.edges || [];
  
  // Format to match the structure the UI expects
  return edges.map(({ node }: any) => {
    return {
      id: node.handle, // Use handle instead of ID for cleaner URLs
      variantId: node.variants.edges[0]?.node?.id || "",
      tag: node.tags && node.tags.length > 0 ? node.tags[0] : "",
      title: node.title,
      sub: node.productType || "Apparel",
      price: `$${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}`,
      src: node.images.edges[0]?.node?.url || "",
    };
  });
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        productType
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 3) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;

  const variables = { handle };
  const response = await shopifyFetch({ query, variables });
  
  const product = response.body?.data?.product;
  
  if (!product) {
    return null;
  }

  return {
    id: product.handle,
    variantId: product.variants.edges[0]?.node?.id || "",
    tag: product.tags && product.tags.length > 0 ? product.tags[0] : "",
    title: product.title,
    description: product.description,
    sub: product.productType || "Apparel",
    price: `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
    src: product.images.edges[0]?.node?.url || "",
    images: product.images.edges.map((edge: any) => edge.node.url),
  };
}

export async function createCart(variantId: string) {
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [{ quantity: 1, merchandiseId: variantId }]
    }
  };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cartCreate?.cart;
}

export async function addToCart(cartId: string, variantId: string) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
      }
    }
  `;
  const variables = {
    cartId,
    lines: [{ quantity: 1, merchandiseId: variantId }]
  };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cartLinesAdd?.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
      }
    }
  `;
  const variables = { cartId };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cart;
}
