import { gql } from 'graphql-request';

// ===================================
// Homepage Queries
// ===================================
export const HOMEPAGE_QUERIES = {
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
}`
};