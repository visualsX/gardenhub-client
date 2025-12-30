import { gql } from 'graphql-request';

// ===================================
// Shop Queries
// ===================================

export const SHOP_QUERIES = {
  // SHOP_ALL_PRODUCTS: gql`
  //   query (
  //     $first: Int
  //     $after: String
  //     $last: Int
  //     $before: String
  //     $where: ProductCardDtoFilterInput
  //     $order: [ProductCardDtoSortInput!]
  //   ) {
  //     shopProducts(
  //       first: $first
  //       after: $after
  //       last: $last
  //       before: $before
  //       where: $where
  //       order: $order
  //     ) {
  //       totalCount
  //       edges {
  //         cursor
  //         node {
  //           categoryName
  //           discountPercentage
  //           hasVariants
  //           id
  //           isOnSale
  //           isSoldOut
  //           mainImageUrl
  //           name
  //           price
  //           salePrice
  //           slug
  //         }
  //       }
  //     }
  //   }
  // `,
  SIDEBAR_FILTER_QUERY: gql`
    query ($categorySlug: String) {
      shopFilters(categorySlug: $categorySlug) {
        name
        options {
          productCount
          slug
          value
        }
      }
    }
  `,

  FILTERED_PRODUCTS: gql`
    query (
      $first: Int
      $after: String
      $last: Int
      $before: String
      $filter: ShopProductFilterInput!
    ) {
      filteredProducts(
        first: $first
        after: $after
        last: $last
        before: $before
        filter: $filter
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        edges {
          cursor
          node {
            categoryName
            discountPercentage
            hasVariants
            id
            isOnSale
            isSoldOut
            mainImageUrl
            name
            price
            salePrice
            slug
          }
        }
      }
    }
  `,
};
