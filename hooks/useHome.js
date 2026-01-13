import { useQuery } from '@tanstack/react-query';
import graphqlClient from '@/lib/api/client-config/graphql-client';
import { LANDING_PAGE_QUERIES } from '@/lib/api/queries/home.queries';

export const useActiveBanners = (initialData) => {
  return useQuery({
    queryKey: ['active-banners'],
    queryFn: async () => {
      const data = await graphqlClient.request(LANDING_PAGE_QUERIES.GET_ACTIVE_BANNERS);
      return data?.activeBanners || [];
    },
    initialData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useLandingPageSections = (initialData) => {
  return useQuery({
    queryKey: ['landing-page-sections'],
    queryFn: async () => {
      const data = await graphqlClient.request(LANDING_PAGE_QUERIES.GET_LANDING_PAGE_SECTIONS);
      return data?.landingPage?.sections || [];
    },
    initialData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
export const useShopCollections = (initialData) => {
  return useQuery({
    queryKey: ['shop-collections'],
    queryFn: async () => {
      const data = await graphqlClient.request(LANDING_PAGE_QUERIES.GET_SHOP_COLLECTIONS);
      return data?.featuredCategories || [];
    },
    initialData,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
