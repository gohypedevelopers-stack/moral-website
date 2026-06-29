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

type ShopifyProductNode = {
  title: string;
  handle: string;
  tags?: string[];
  productType?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText?: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title?: string;
        availableForSale?: boolean;
        selectedOptions?: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
};

function formatProduct(node: ShopifyProductNode) {
  return {
    id: node.handle,
    variantId: node.variants.edges[0]?.node?.id || "",
    tag: node.tags && node.tags.length > 0 ? node.tags[0] : "",
    title: node.title,
    sub: node.productType || "Apparel",
    price: `$${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}`,
    src: node.images.edges[0]?.node?.url || "",
    variants: node.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title || "Default",
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions || [],
    })),
  };
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
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
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
  
  return edges.map(({ node }: { node: ShopifyProductNode }) => formatProduct(node));
}

export async function getCollections() {
  const query = `
    query getCollections {
      collections(first: 12) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
            }
            products(first: 1) {
              edges {
                node {
                  images(first: 1) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query });
  const edges = response.body?.data?.collections?.edges || [];

  return edges.map(({ node }: any) => ({
    id: node.handle,
    title: node.title,
    label: "Shop the edit",
    src: node.image?.url || node.products?.edges?.[0]?.node?.images?.edges?.[0]?.node?.url || "",
    href: `/shop?collection=${encodeURIComponent(node.handle)}`,
  }));
}

export async function getProductsByCollection(handle: string) {
  const query = `
    query getProductsByCollection($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
        products(first: 24) {
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
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { handle } });
  const collection = response.body?.data?.collection;

  if (!collection) {
    return { collection: null, products: [] };
  }

  return {
    collection: {
      id: collection.handle,
      title: collection.title,
      handle: collection.handle,
    },
    products: collection.products.edges.map(({ node }: { node: ShopifyProductNode }) => formatProduct(node)),
  };
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
        variants(first: 100) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
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
    variants: product.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      availableForSale: edge.node.availableForSale,
      selectedOptions: edge.node.selectedOptions || [],
    })),
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


export async function updateCartLine(cartId: string, lineId: string, quantity: number) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          ...cartDetails
        }
      }
    }
    ${cartFragment}
  `;
  const variables = {
    cartId,
    lines: [{ id: lineId, quantity }],
  };
  const response = await shopifyFetch({ query, variables });
  return response.body?.data?.cartLinesUpdate?.cart;
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
  const heroFileId = "gid://shopify/GenericFile/38844184133853";

  const query = `
    query getHeroVideo($id: ID!) {
      node(id: $id) {
        ... on Video {
          sources {
            url
          }
        }
        ... on GenericFile {
          url
        }
      }
    }
  `;

  const response = await shopifyFetch({ query, variables: { id: heroFileId } });
  
  const sources = response.body?.data?.node?.sources || [];
  const mp4Sources = sources.filter((s: any) => s.url.endsWith('.mp4'));
  if (mp4Sources.length > 0) {
    const hdSource = mp4Sources.find((s: any) => s.url.includes('1080p')) || mp4Sources[0];
    return hdSource.url;
  }

  const fileUrl = response.body?.data?.node?.url;
  if (typeof fileUrl === "string" && fileUrl.length > 0) {
    return fileUrl;
  }
  
  return null;
}
