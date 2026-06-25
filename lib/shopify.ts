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

const cartFragment = `
  fragment cartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export async function createCart(variantId: string) {
  const query = `
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          ...cartDetails
        }
      }
    }
    ${cartFragment}
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
          ...cartDetails
        }
      }
    }
    ${cartFragment}
  `;
  const variables = {
    cartId,
    lines: [{ quantity: 1, merchandiseId: variantId }]
  };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cartLinesAdd?.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          ...cartDetails
        }
      }
    }
    ${cartFragment}
  `;
  const variables = {
    cartId,
    lineIds
  };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cartLinesRemove?.cart;
}

export async function getCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        ...cartDetails
      }
    }
    ${cartFragment}
  `;
  const variables = { cartId };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cart;
}

export async function getHeroVideoUrl() {
  const query = `
    query getHeroVideo {
      node(id: "gid://shopify/Video/32919002480822") {
        ... on Video {
          sources {
            url
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  
  const sources = response.body?.data?.node?.sources || [];
  const mp4Sources = sources.filter((s: any) => s.url.endsWith('.mp4'));
  if (mp4Sources.length > 0) {
    const hdSource = mp4Sources.find((s: any) => s.url.includes('1080p')) || mp4Sources[0];
    return hdSource.url;
  }
  
  return null;
}
