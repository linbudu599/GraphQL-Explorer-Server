import React from 'react';
import GetAllUsers from './pages/GetAllUsers';
import QueryUser from './pages/QueryUser';
import GetAllUsersManually from './pages/GetAllUsersManually';
import UserMutation from './pages/UserMutation';

const App = () => (
  <>
    {/* <p>Query(TypeGraphQL-Server) Get All Users</p>
    <GetAllUsers />


    <p>Query(TypeGraphQL-Server) Query User By Conditions</p>
    <QueryUser />


    <p>Delayed Query(TypeGraphQL-Server) Query User Manually</p>
    <GetAllUsersManually /> */}

    <p>Mutations(TypeGraphQL-Server) Create User</p>
    <UserMutation />
  </>
);

export default App;
