import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import UserItem, { IUserItem } from "../components/UsertItem";

import { GET_ALL_USERS } from './GetAllUsers'

const GetAllUsersManually: React.FC = () => {
  const [userList, setUserList] = useState<IUserItem[]>();

  const [invoke, { loading, error, data }] = useLazyQuery(GET_ALL_USERS, {});

  if (loading) return <p>Loading</p>;
  if (error) return <p>Error Occured</p>;

  if (data && data.Users) {
    setUserList(data.Users);
  }
  console.log(data)

  return (
    <>
      {/* {userList.map((user) => <UserItem key={user.uid} user={user} />)} */}
      <p>{userList && JSON.stringify(userList)}</p>
      <button
        onClick={() => {
          invoke();
        }}
      >
        Invoke
      </button>
    </>
  );
};

export default GetAllUsersManually;
