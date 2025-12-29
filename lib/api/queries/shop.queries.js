import { gql } from 'graphql-request';

// ===================================
// Shop Queries
// ===================================

export const SHOP_QUERIES = {
  SHOP_ALL_PRODUCTS: gql`
    query (
      $first: Int
      $after: String
      $last: Int
      $before: String
      $where: ProductCardDtoFilterInput
      $order: [ProductCardDtoSortInput!]
    ) {
      shopProducts(
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        totalCount
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
  SIDEBAR_FILTER_QUERY: gql`
    query {
      shopFilters {
        name
        options {
          productCount
          slug
          value
        }
      }
    }
  `,

  //   {
  //   "data": {
  //     "shopFilters": [
  //       {
  //         "name": "Benefits",
  //         "options": [
  //           {
  //             "productCount": 6,
  //             "slug": "expanded-roots",
  //             "value": "Expanded Roots"
  //           },
  //           {
  //             "productCount": 6,
  //             "slug": "roots-nourishment",
  //             "value": "Roots Nourishment"
  //           }
  //         ]
  //       },
  //       {
  //         "name": "Type of Plant",
  //         "options": [
  //           {
  //             "productCount": 9,
  //             "slug": "dry",
  //             "value": "Dry"
  //           },
  //           {
  //             "productCount": 3,
  //             "slug": "muddy",
  //             "value": "Muddy"
  //           },
  //           {
  //             "productCount": 12,
  //             "slug": "sandish",
  //             "value": "Sandish"
  //           },
  //           {
  //             "productCount": 1,
  //             "slug": "smoky",
  //             "value": "Smoky"
  //           },
  //           {
  //             "productCount": 12,
  //             "slug": "wet",
  //             "value": "Wet"
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // }
};
