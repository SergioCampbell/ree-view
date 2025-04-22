import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  // uri: 'http://localhost:3000/ree-client',
  uri: 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});

export default client;