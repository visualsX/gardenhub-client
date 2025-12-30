import { gql } from 'graphql-request';

// ===================================
// Auth Queries
// ===================================
export const AUTH_QUERIES = {
    //   GET_CUSTOMER_ADDRESS: gql`
    //     query (
    //       $first: Int
    //       $after: String
    //       $last: Int
    //       $before: String
    //       $where: AddressDtoFilterInput
    //       $order: [AddressDtoSortInput!]
    //     ) {
    //       customerAddresses(
    //         first: $first
    //         after: $after
    //         last: $last
    //         before: $before
    //         where: $where
    //         order: $order
    //       ) {
    //         pageInfo {
    //           endCursor
    //           hasNextPage
    //           hasPreviousPage
    //           startCursor
    //         }
    //         totalCount
    //         edges {
    //           cursor
    //           node {
    //             addressLine2
    //             city
    //             country
    //             customerId
    //             emirate
    //             firstName
    //             id
    //             isDefault
    //             lastName
    //             phone
    //             postalCode
    //             streetAddress
    //           }
    //         }
    //       }
    //     }
    //   `,
    GET_CUSTOMER_PROFILE_USING_TOKEN: gql`
    query {
      customerProfile {
        email
        firstName
        id
        lastName
        addresses {
          addressLine2
          city
          country
          customerId
          emirate
          firstName
          id
          isDefault
          lastName
          phone
          postalCode
          streetAddress
        }
      }
    }
  `,
};
