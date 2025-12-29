import { gql } from 'graphql-request';

// ===================================
// Menu Queries
// ===================================
export const MENU_QUERIES = {
  GET_MENU: gql`
    query {
      shopCategories {
        id
        name
        slug
        imageUrl
        productCount
        children {
          id
          name
          slug
          imageUrl
          productCount
          children {
            id
            name
            slug
            imageUrl
            productCount
          }
        }
      }
    }
  `,
};

// expected response
// {
//   "data": {
//     "shopCategories": [
//       {
//         "id": 45,
//         "name": "Accessories",
//         "slug": "accessories",
//         "imageUrl": null,
//         "productCount": 0,
//         "children": [
//           {
//             "id": 55,
//             "name": "Fountains",
//             "slug": "fountains",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 56,
//             "name": "Mugs",
//             "slug": "mugs",
//             "imageUrl": null,
//             "productCount": 1,
//             "children": []
//           },
//           {
//             "id": 57,
//             "name": "Pots",
//             "slug": "pots",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 58,
//             "name": "Scrappers",
//             "slug": "scrappers",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           }
//         ]
//       },
//       {
//         "id": 46,
//         "name": "Care Essentials",
//         "slug": "care-essentials",
//         "imageUrl": null,
//         "productCount": 0,
//         "children": [
//           {
//             "id": 59,
//             "name": "Fertilizers",
//             "slug": "fertilizers",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 62,
//             "name": "Pestisides",
//             "slug": "pestisides",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           }
//         ]
//       },
//       {
//         "id": 42,
//         "name": "Indoor",
//         "slug": "indoor",
//         "imageUrl": null,
//         "productCount": 0,
//         "children": [
//           {
//             "id": 48,
//             "name": "Best Seller",
//             "slug": "best-seller",
//             "imageUrl": null,
//             "productCount": 4,
//             "children": []
//           },
//           {
//             "id": 47,
//             "name": "Bundles",
//             "slug": "bundles",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": [
//               {
//                 "id": 60,
//                 "name": "Nested Sub",
//                 "slug": "nested-sub",
//                 "imageUrl": null,
//                 "productCount": 1
//               }
//             ]
//           },
//           {
//             "id": 49,
//             "name": "Low Light",
//             "slug": "low-light",
//             "imageUrl": null,
//             "productCount": 1,
//             "children": []
//           }
//         ]
//       },
//       {
//         "id": 43,
//         "name": "Outdoor",
//         "slug": "outdoor",
//         "imageUrl": null,
//         "productCount": 0,
//         "children": [
//           {
//             "id": 52,
//             "name": "Best Seller",
//             "slug": "best-seller-1",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 51,
//             "name": "Bundles",
//             "slug": "bundles-1",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 54,
//             "name": "Cactus",
//             "slug": "cactus",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           },
//           {
//             "id": 53,
//             "name": "Fruitful",
//             "slug": "fruitful",
//             "imageUrl": null,
//             "productCount": 0,
//             "children": []
//           }
//         ]
//       }
//     ]
//   }
// }
