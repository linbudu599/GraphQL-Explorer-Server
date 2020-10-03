import React from 'react';
import GetAllUsers from './pages/GetAllUsers';
import QueryUser from './pages/QueryUser';
import GetAllUsersManually from './pages/GetAllUsersManually';
import UserMutation from './pages/UserMutation';
import SingleFileUpload from './pages/FileUpload';

const App = () => (
  <>
    <p>Query(TypeGraphQL-Server) Get All Users</p>
    <GetAllUsers />


    <p>Query(TypeGraphQL-Server) Query User By Conditions</p>
    <QueryUser />


    <p>Delayed Query(TypeGraphQL-Server) Query User Manually</p>
    <GetAllUsersManually />

  </>
);

export default App;
