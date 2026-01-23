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
};
