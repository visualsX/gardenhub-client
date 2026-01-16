import { gql } from 'graphql-request';

// ===================================
// ORDERS QUERIES
// ===================================
export const ORDERS_QUERIES = {
    GET_MY_ORDERS: gql`
    query ($first: Int, $after: String, $last: Int, $before: String, $where: OrderListDtoFilterInput) {
      myOrders(first: $first, after: $after, last: $last, before: $before, where: $where) {
        totalCount
        edges {
          cursor
          node {
            createdAt
            grandTotal
            id
            itemCount
            orderNumber
            status
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

    GET_ORDERS_ID: gql`
    query ($id: Int!) {
      customerOrderById(id: $id) {
        carrier
        createdAt
        discountAmount
        expectedDeliveryDate
        grandTotal
        id
        orderNumber
        shippingFee
        status
        subtotal
        taxAmount
        trackingNumber
        items {
          imageUrl
          itemTotal
          pricePerUnit
          productId
          productName
          productSku
          productVariantId
          quantity
          variantAttributes
          addons {
            addonName
            id
            imageUrl
            optionName
            priceAtPurchase
            quantity
          }
        }
        notes {
          createdAt
          createdBy
          message
          type
        }
        trackingHistory {
          carrier
          createdAt
          expectedDelivery
          notes
          status
          trackingNumber
        }
        transactions {
          amount
          createdAt
          isRefund
          paymentMethod
          refundReason
          status
        }
        shippingAddress {
          city
          country
          fullName
          phone
          postalCode
          streetAddress
        }
        customer {
          email
          firstName
          id
          lastName
        }
        billingAddress {
          city
          country
          fullName
          phone
          postalCode
          streetAddress
        }
      }
    }
  `,
};
