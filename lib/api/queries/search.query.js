import { gql } from 'graphql-request';

// ===================================
// Search Queries
// ===================================
export const SEARCH_QUERIES = {
    GET_SEARCH_SUGGESTIONS: gql`
   query ($limit: Int, $query: String!) {
  searchSuggestions(limit: $limit, query: $query) {
    collections {
      id
      imageUrl
      name
      productCount
      slug
    }
    products {
      id
      mainImageUrl
      name
      price
      slug
    }
  }
}
  `,
};


