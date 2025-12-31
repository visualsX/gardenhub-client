import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_BASE } from '../../const/global.variables';

// Create GraphQL client
const graphqlClient = new GraphQLClient(GRAPHQL_BASE, {
  headers: {},
});

// Function to set auth token dynamically
export const setAuthToken = (token) => {
  if (token) {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`);
  }
};

// Setup interceptor-like behavior
export const setupGraphQLClient = () => {
  if (typeof window !== 'undefined') {
    // Get token from cookie
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      setAuthToken(token);
    }
  }
};

// Initialize on import
setupGraphQLClient();

export default graphqlClient;
