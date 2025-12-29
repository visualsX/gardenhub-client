import { gql } from 'graphql-request';

// ===================================
// Homepage Queries
// ===================================
export const HOMEPAGE_QUERIES = {
  GET_FEATURED_PRODUCTS: gql`
    query ($collectionType: String!, $limit: Int!, $categorySlug: String) {
      featuredProducts(
        collectionType: $collectionType
        categorySlug: $categorySlug
        limit: $limit
      ) {
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
};

// payload
// {
//    "categorySlug": null,
//    "collectionType": "sale",
//    "limit": 4
// }

// response
// {
//   "data": {
//     "featuredProducts": [
//       {
//         "id": 136,
//         "hasVariants": true,
//         "name": "Chrismis Tree",
//         "slug": "chrismis-tree",
//         "salePrice": 20,
//         "isOnSale": false,
//         "isSoldOut": true,
//         "mainImageUrl": "https://api.gardenhub.ae/ProductImages/136-09de60cc-ebec-405c-8302-e3f48b1263bd.png",
//         "categoryName": "Low Light",
//         "price": 400,
//         "discountPercentage": 0
//       },
//       {
//         "id": 121,
//         "hasVariants": true,
//         "name": "Track Inventory Test at root level",
//         "slug": "track-inventory-test-at-root-level",
//         "salePrice": 122,
//         "isOnSale": false,
//         "isSoldOut": true,
//         "mainImageUrl": "https://api.gardenhub.ae/ProductImages/121-7817b64c-4ea5-431b-888f-00af23ae6efb.png",
//         "categoryName": "Nested Sub",
//         "price": 500,
//         "discountPercentage": 0
//       },
//       {
//         "id": 118,
//         "hasVariants": true,
//         "name": "Hania-updated updated",
//         "slug": "hania-updated-updated",
//         "salePrice": 120,
//         "isOnSale": false,
//         "isSoldOut": false,
//         "mainImageUrl": null,
//         "categoryName": "Mugs",
//         "price": 500,
//         "discountPercentage": 0
//       },
//       {
//         "id": 124,
//         "hasVariants": true,
//         "name": "Cactus7",
//         "slug": "cactus7",
//         "salePrice": 120,
//         "isOnSale": false,
//         "isSoldOut": true,
//         "mainImageUrl": "https://api.gardenhub.ae/ProductImages/124-818bc25e-b498-4362-859c-36e0e838ce1e.png",
//         "categoryName": "Best Seller",
//         "price": 999,
//         "discountPercentage": 0
//       }
//     ]
//   }
// }
