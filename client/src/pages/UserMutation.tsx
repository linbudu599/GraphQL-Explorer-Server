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
    </>
  );
};

export default Hello;
