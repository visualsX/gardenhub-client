import { GRAPHQL_BASE } from '@/lib/const/global.variables';
import { GraphQLClient } from 'graphql-request';

export const serverClient = new GraphQLClient(GRAPHQL_BASE, {
  headers: {},
  timeout: 10000,
});
