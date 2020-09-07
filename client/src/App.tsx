import React from 'react';
import UserQuery from './pages/UserQuery';
import DelayedUserQuery from './pages/DelayedUserQuery';
import UserMutation from './pages/UserMutation';

const App = () => (
  <>
    <p>UserQuery</p>
    <UserQuery />
    <p>DelayedUserQuery</p>
    <DelayedUserQuery />
    <p>UserMutation</p>
    <UserMutation />
  </>
);

export default App;
