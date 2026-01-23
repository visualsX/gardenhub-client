import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import client from '@/lib/api/client-config/client';
import { REVIEW_QUERIES } from '@/lib/api/queries/reviews.queries';
import { API_ENDPOINTS } from '@/lib/const/endpoints';

// GraphQL Queries

export const useProductReviewStats = (productId) => {
  return useQuery({
    queryKey: ['productReviewStats', productId],
    queryFn: async () => {
      const data = await graphqlClient.request(REVIEW_QUERIES.GET_PRODUCT_REVIEW_STATS, {
        productId,
      });
      return data.productReviewStats;
    },
    enabled: !!productId,
  });
};

export const useProductReviews = (productId, first = 5) => {
  return useInfiniteQuery({
    queryKey: ['productReviews', productId],
    queryFn: async ({ pageParam }) => {
      const data = await graphqlClient.request(REVIEW_QUERIES.GET_PRODUCT_REVIEWS, {
        productId,
        first,
        after: pageParam,
      });
      return data.productReviews;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : null,
    enabled: !!productId,
  });
};

export const useCanReviewProduct = (productId) => {
  return useQuery({
    queryKey: ['canReviewProduct', productId],
    queryFn: async () => {
      const data = await graphqlClient.request(REVIEW_QUERIES.GET_CAN_REVIEW_PRODUCT, {
        productId,
      });
      return data.canReviewProduct;
    },
    enabled: !!productId,
  });
};

// REST Mutations

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: async (formData) => {
      // formData should be a FormData object for multipart/form-data
      const { data } = await client.post(API_ENDPOINTS.REVIEW.CREATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await client.put(`${API_ENDPOINTS.REVIEW.UPDATE}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });
};
