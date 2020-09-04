import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloProvider,
  useQuery,
  InMemoryCache,
  ApolloClient,
  gql,
} from '@apollo/client';

import App from './App';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:4000/',
  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Apollo-FullAPI-Explorer',
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
    isLoggedIn: !!localStorage.getItem('token'),
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
