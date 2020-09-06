import React, { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const Hello: React.FC = () => {
  const [userList, setUserList] = useState<any[]>();

  const GET_USERS = gql`
    query {
      Users {
        name
        isFool
        job
      }
    }
  `;

  const [invoke, { loading, error, data }] = useLazyQuery(GET_USERS, {});

  if (data && data.Users) {
    setUserList(data.Users);
  }

  if (loading) return <p>'Loading'</p>;
  if (error) return <p>'Error Occured'</p>;
  console.log(data);
  return (
    <>
      <p>{JSON.stringify(userList)}</p>
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

export default Hello;
