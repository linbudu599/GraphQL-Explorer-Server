import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const Hello: React.FC = () => {
  const NOT_LONGER_FULL = gql`
    mutation notLongerFull($uid: Float!) {
      NotLongerFull(uid: $uid) {
        success
        message
      }
    }
  `;

  const CREATE_USER = gql`
    mutation createUser($userInfo: UserInputOrArgs!) {
      CreateUser(newUserInfo: $userInfo) {
        name
        age
        isFool
        job
      }
    }
  `;

  const [fool, { data, loading, error, called }] = useMutation(
    NOT_LONGER_FULL,
    {
      update(cache, { data: { fool } }) {
        // update client cache
        cache.modify({
          fields: {},
        });
      },
      ignoreResults: false,
      onCompleted: (data) => console.log('Completed'),
      onError: (error) => console.error(error),
      context: {},
      // like res placeholder before feed back
      // optimisticResponse:{}
      // refetch queries after mutation called
      refetchQueries: [],
      // true: all refetchQueries will be completed before mutation finished
      awaitRefetchQueries: false,
    }
  );

  const [
    createUser,
    { data: creationData, loading: creationLoading },
  ] = useMutation(CREATE_USER, {
    onCompleted: (data) => console.log(data),
  });

  return (
    <>
      <button
        onClick={() => {
          fool({
            variables: {
              uid: 2,
            },
          });
        }}
      >
        Not Longer Full
      </button>
      <br />
      {creationLoading ? (
        <p>Creating...</p>
      ) : (
        <p>{JSON.stringify(creationData)}</p>
      )}
      <button
        onClick={() => {
          createUser({
            variables: {
              userInfo: {
                name: 'Penumbra',
              },
            },
          });
        }}
      >
        Create User
      </button>
    </>
  );
};

export default Hello;
