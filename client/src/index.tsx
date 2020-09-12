import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  useQuery,
  InMemoryCache,
  ApolloClient,
  gql,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import App from './App';

const cache = new InMemoryCache({
  // __typename added
  addTypename: true,
  // use === to compare query result & cache
  resultCaching: true,
});
const client = new ApolloClient({
  cache,
  // uri: 'http://localhost:4000/',
  link: createUploadLink({ uri: 'http://localhost:4000/graphql' }),
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Apollo-FullAPI-Explorer[Client]',
    'client-version': '0.1.0',
  },
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    // isLoggedIn: !!localStorage.getItem('token'),
    isLoggedIn: true,
  },
});

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <p>UN_LOGGED_IN</p>;
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <IsLoggedIn />
  </ApolloProvider>,
  document.getElementById('root')
);
