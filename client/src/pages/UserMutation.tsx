import React from 'react';
import { gql, useMutation } from '@apollo/client';

const UserMutation: React.FC = () => {
  const NOT_LONGER_FULL = gql`
    mutation notLongerFull($uid: Float!) {
      NotLongerFull(uid: $uid) {
        success
        message
      }
    }
  `;

  const CREATE_USER = gql`
    mutation createUser($userInfo: UserCreateInput!) {
      CreateUser(newUserInfo: $userInfo) {
        name
        age
        isFool
        job
      }
    }
    
  `;

  const UPDATE_USER = gql`
      mutation updateUser($modifiedUserInfo: UserUpdateInput!){
        UpdateUser(modifiedUserInfo: $modifiedUserInfo) {
          success
          message
        }
      }
    `

  const [fool, { data: foolData, loading, error, called }] = useMutation(
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

  const [updateUser, { data: updateData, loading: updateLoading }] = useMutation(UPDATE_USER, {

  })

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
      {foolData && JSON.stringify(foolData)}
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
                name: `Penumbra${Math.floor(Math.random() * 100)}`,
              },
            },
          });
        }}
      >
        Create User
      </button>
      <br />
      {updateLoading ? (
        <p>Updating...</p>
      ) : (
          <p>{JSON.stringify(updateData)}</p>
        )}
      <button
        onClick={() => {
          updateUser({
            variables: {
              modifiedUserInfo: {
                uid: 1,
                name: 'Penumbra!!!!',
              }
            },
          });
        }}
      >
        Update User
      </button>
    </>
  );
};

export default UserMutation;
