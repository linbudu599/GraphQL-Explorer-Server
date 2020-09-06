import React, { useState } from 'react';
import { gql, useQuery, NetworkStatus, useLazyQuery } from '@apollo/client';

const Hello: React.FC = () => {
  const [queryId, setQueryId] = useState<number>(1);

  const GET_USERS = gql`
    query($uid: Float!) {
      Users {
        name
        isFool
        job
      }
      FindUserById(uid: $uid) {
        name
        isFool
        job
      }
    }
  `;

  const {
    loading,
    error,
    data,
    refetch,
    networkStatus,
    // used in current request
    variables,
    fetchMore,
    startPolling,
    stopPolling,
    // (prev, {variables})
    updateQuery,
  } = useQuery(GET_USERS, {
    variables: { uid: queryId },
    // pollInterval: 500,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    ssr: false,
    displayName: 'QUERY_GET_USERS',
    skip: false,
    onCompleted: (data) => console.log('Completed'),
    onError: (error) => console.error(error),
    context: {},
    partialRefetch: true,
    // client
    returnPartialData: false,
  });

  if (networkStatus === NetworkStatus.refetch) return <p>'Refetching!'</p>;
  if (loading) return <p>'Loading'</p>;
  if (error) return <p>'Error Occured'</p>;

  return (
    <>
      <p>{JSON.stringify(data)}</p>

      <button
        onClick={() => {
          setQueryId(2);
          // 其实不需要调用refetch 变量变化会自动重新调用
          refetch();
        }}
      >
        Refetch By UID 2
      </button>
      <button
        onClick={() => {
          // updateQuery((data,{variables:{ }})=>{})
        }}
      >
        Update Query
      </button>
    </>
  );
};

export default Hello;
