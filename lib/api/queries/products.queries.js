import { gql } from 'graphql-request';

// ===================================
// Products Queries
// ===================================
export const PRODUCTS_QUERIES = {
  GET_PRODUCTS_BY_CATEGORY: gql`
    query (
      $categorySlug: String!
      $first: Int
      $after: String
      $last: Int
      $before: String
      $where: ProductCardDtoFilterInput
      $order: [ProductCardDtoSortInput!]
    ) {
      productsByCategory(
        categorySlug: $categorySlug
        first: $first
        after: $after
        last: $last
        before: $before
        where: $where
        order: $order
      ) {
        nodes {
          id
          hasVariants
          name
          slug
          salePrice
          isOnSale
          isSoldOut
          mainImageUrl
          categoryName
          price
          discountPercentage
        }
        edges {
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  `,
  GET_PRODUCT_BY_SLUG: gql`
    query GetProductBySlug($slug: String!) {
      shopProductBySlug(slug: $slug) {
        id
        hasVariants
        name
        slug
        options {
          name
          values {
            value
            colorHex
          }
        }
        variants {
          id
          sku
          salePrice
          price
          stockQuantity
          isAvailable
          attributes {
            key
            value {
              colorHex
              value
            }
          }
        }
        stockQuantity
        sku
        shortDescription
        detailedDescription
        metaTitle
        metaDescription
        images
      }
    }
  `,

  GET_RELATED_PRODUCTS: gql`
    query ($limit: Int!, $productId: Int!) {
      relatedProducts(limit: $limit, productId: $productId) {
        id
        hasVariants
        name
        slug
        salePrice
        isOnSale
        isSoldOut
        mainImageUrl
        categoryName
        price
        discountPercentage
      }
    }
  `,

  GET_PRODUCT_ADDONS: gql`
    query ($productId: Int!, $variantId: Int) {
      productAddonsForDisplay(productId: $productId, variantId: $variantId) {
        productAddonAssignmentId
        name
        description
        globalAddonId
        isRequired
        options {
          description
          id
          imageUrl
          isDefault
          name
          price
          salePrice
        }
      }
    }
  `,
};

//response of GET_PRODUCT_BY_SLUG
// {
//   "data": {
//     "shopProductBySlug": {
//       "id": 158,
//       "hasVariants": true,
//       "name": "Product with varients",
//       "slug": "product-with-varients",
//       "options": [
//         {
//           "name": "Sizes",
//           "values": [
//             {
//               "value": "S",
//               "colorHex": null
//             },
//             {
//               "value": "M",
//               "colorHex": null
//             },
//             {
//               "value": "XL",
//               "colorHex": null
//             },
//             {
//               "value": "XXL",
//               "colorHex": null
//             }
//           ]
//         },
//         {
//           "name": "Colors",
//           "values": [
//             {
//               "value": "Red",
//               "colorHex": "#ff0000"
//             },
//             {
//               "value": "Black",
//               "colorHex": "#000000"
//             },
//             {
//               "value": "Green",
//               "colorHex": "#00ff2f"
//             },
//             {
//               "value": "White",
//               "colorHex": "#ffffff"
//             }
//           ]
//         }
//       ],
//       "variants": [
//         {
//           "id": 290,
//           "sku": "test-variants-32-S-RED",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "S"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ff0000",
//                 "value": "Red"
//               }
//             }
//           ]
//         },
//         {
//           "id": 291,
//           "sku": "test-variants-32-S-BLACK",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "S"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#000000",
//                 "value": "Black"
//               }
//             }
//           ]
//         },
//         {
//           "id": 292,
//           "sku": "test-variants-32-S-GREEN",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "S"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#00ff2f",
//                 "value": "Green"
//               }
//             }
//           ]
//         },
//         {
//           "id": 293,
//           "sku": "test-variants-32-S-WHITE",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "S"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ffffff",
//                 "value": "White"
//               }
//             }
//           ]
//         },
//         {
//           "id": 294,
//           "sku": "test-variants-32-M-RED",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "M"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ff0000",
//                 "value": "Red"
//               }
//             }
//           ]
//         },
//         {
//           "id": 295,
//           "sku": "test-variants-32-M-BLACK",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "M"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#000000",
//                 "value": "Black"
//               }
//             }
//           ]
//         },
//         {
//           "id": 296,
//           "sku": "test-variants-32-M-GREEN",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "M"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#00ff2f",
//                 "value": "Green"
//               }
//             }
//           ]
//         },
//         {
//           "id": 297,
//           "sku": "test-variants-32-M-WHITE",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "M"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ffffff",
//                 "value": "White"
//               }
//             }
//           ]
//         },
//         {
//           "id": 298,
//           "sku": "test-variants-32-XL-RED",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ff0000",
//                 "value": "Red"
//               }
//             }
//           ]
//         },
//         {
//           "id": 299,
//           "sku": "test-variants-32-XL-BLACK",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#000000",
//                 "value": "Black"
//               }
//             }
//           ]
//         },
//         {
//           "id": 300,
//           "sku": "test-variants-32-XL-GREEN",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#00ff2f",
//                 "value": "Green"
//               }
//             }
//           ]
//         },
//         {
//           "id": 301,
//           "sku": "test-variants-32-XL-WHITE",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ffffff",
//                 "value": "White"
//               }
//             }
//           ]
//         },
//         {
//           "id": 302,
//           "sku": "test-variants-32-XXL-RED",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XXL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ff0000",
//                 "value": "Red"
//               }
//             }
//           ]
//         },
//         {
//           "id": 303,
//           "sku": "test-variants-32-XXL-BLACK",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XXL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#000000",
//                 "value": "Black"
//               }
//             }
//           ]
//         },
//         {
//           "id": 304,
//           "sku": "test-variants-32-XXL-GREEN",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XXL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#00ff2f",
//                 "value": "Green"
//               }
//             }
//           ]
//         },
//         {
//           "id": 305,
//           "sku": "test-variants-32-XXL-WHITE",
//           "salePrice": 0,
//           "price": 999,
//           "stockQuantity": 0,
//           "isAvailable": false,
//           "attributes": [
//             {
//               "key": "Sizes",
//               "value": {
//                 "colorHex": null,
//                 "value": "XXL"
//               }
//             },
//             {
//               "key": "Colors",
//               "value": {
//                 "colorHex": "#ffffff",
//                 "value": "White"
//               }
//             }
//           ]
//         }
//       ],
//       "stockQuantity": 0,
//       "sku": "test-variants-32",
//       "shortDescription": "Search engine optimization details",
//       "detailedDescription": "Search engine optimization details",
//       "metaTitle": "Search engine optimization details",
//       "metaDescription": "Search engine optimization details\r\n\r\n",
//       "images": [
//         "https://api.gardenhub.ae/ProductImages/158-9527e0fc-373f-4b85-998f-e07084906307.png",
//         "https://api.gardenhub.ae/ProductImages/158-51af9e54-8f43-4a79-a8df-387d85410af8.png",
//         "https://api.gardenhub.ae/ProductImages/158-06749158-4912-41da-b170-821030397a39.png",
//         "https://api.gardenhub.ae/ProductImages/158-214f322f-4881-4cfb-83ac-402e04e4b70d.png",
//         "https://api.gardenhub.ae/ProductImages/158-19350f8f-637a-4218-ba29-c11c45d3bdea.png"
//       ]
//     }
//   }
// }
