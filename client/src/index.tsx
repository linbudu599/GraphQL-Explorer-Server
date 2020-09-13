import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, useQuery } from '@apollo/client';
import App from './App';
import clientCreator, { IS_LOGGED_IN } from './apollo/client';

const IsLoggedIn = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <p>UN_LOGGED_IN</p>;
};

(() => {
  const client = clientCreator();
  ReactDOM.render(
    <ApolloProvider client={client}>
      <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
  );
})();
