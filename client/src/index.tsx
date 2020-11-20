import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ApolloProvider, useQuery } from '@apollo/client';

import createApolloClient, {
  IS_LOGGED_IN,
  ICheckLoginedIn,
} from './apollo/client';

import App from './App';
import UnLoginPage from './pages/unlogin';

const Entry: React.FC = () => {
  const { data } = useQuery(IS_LOGGED_IN) as ICheckLoginedIn;
  return data.isLoggedIn ? <App /> : <UnLoginPage />;
};

const client = createApolloClient();

ReactDOM.render(
  // <ApolloProvider client={client}>
  //   <Entry />
  // </ApolloProvider>,
  <App />,
  document.getElementById('root')
);
