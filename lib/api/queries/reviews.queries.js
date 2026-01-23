import { gql } from 'graphql-request';

// ===================================
// Reviews Queries
// ===================================
export const REVIEW_QUERIES = {
    GET_CAN_REVIEW_PRODUCT: gql`
    query CanReviewProduct($productId: Int!) {
      canReviewProduct(productId: $productId)
    }
  `,
    GET_PRODUCT_REVIEW_STATS: gql`
    productReviewStats(productId: $productId) {
    averageRating
    totalReviews
    ratingDistribution{
      key
      value
    }
  }
    `,
    GET_PRODUCT_REVIEWS: gql`
    query GetProductReviews($productId: Int!, $first: Int, $after: String) {
      productReviews(
        productId: $productId
        first: $first
        after: $after
        order: { createdAt: DESC }
      ) {
        nodes {
          id
          customerName
          rating
          title
          description
          image1Url
          image2Url
          createdAt
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  `,
};
