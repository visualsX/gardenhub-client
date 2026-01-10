import { gql } from 'graphql-request';

// ===================================
// Homepage Queries
// ===================================
export const LANDING_PAGE_QUERIES = {
  GET_ACTIVE_BANNERS: gql`
query {
 activeBanners {
    backgroundOverlay
    description
    heading
    id
    imageUrl
    mobileImageUrl
    overlayOpacity
    subheading
    textAlignment
    textPosition
    videoUrl
    endDate
    primaryButton {
      link
      style
      text
    }
    secondaryButton {
      link
      style
      text
    }
    startDate
  }
}`,
  GET_LANDING_PAGE_SECTIONS: gql`
query {
  landingPage {
    sections {
      key
      value {
        categoryId
        categoryName
        categorySlug
        customTitle
        displayOrder
        id
        imageUrl
        isActive
        placementArea
        products {
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
}`,
};