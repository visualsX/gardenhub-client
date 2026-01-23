import { gql } from 'graphql-request';

// ===================================
// Bundles Queries
// ===================================
export const BUNDLES_QUERIES = {
  GET_BUNDLES: gql`
    query ($first: Int, $after: String, $last: Int, $before: String) {
      shopBundles(first: $first, after: $after, last: $last, before: $before) {
        totalCount
        edges {
          cursor
          node {
            detailDescription
            id
            includesItems
            keywords
            mainImageUrl
            metaDescription
            metaTitle
            name
            originalPrice
            price
            savingsAmount
            shortDescription
            slug
            items {
              productId
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `,
  GET_BUNDLE_BY_SLUG: gql`
    query ($slug: String!) {
       id
    price
    originalPrice
    shortDescription
    detailDescription
    mainImageUrl
    savingsAmount
    includesItems
    items {
      productId
      totalPrice
      productName
      productSlug
      productImageUrl
      unitPrice
      variantId
      variantSku
      variantName
      variantAttributesJson
      quantity
      unitPrice
    }
    keywords
    metaDescription
    metaTitle
    name
    slug
  }
    }
  `,
};
