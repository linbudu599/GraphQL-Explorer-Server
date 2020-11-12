import React, { useState } from 'react';
import { gql, useQuery, NetworkStatus } from '@apollo/client';
import UserItem from '../components/UsertItem';

import { IUser } from '../typings';

export const GET_ALL_USERS = gql`
  query {
    Users {
      uid
      name
      age
      job
      isFool
      registryDate
      lastUpdateDate
    }
  }
`;

const GetAllUsers: React.FC = () => {
  const {
    loading,
    error,
    data,
    refetch,
    networkStatus,
    variables,
    fetchMore,
    startPolling,
    stopPolling,
    // (prev, {variables})
    updateQuery,
  } = useQuery(GET_ALL_USERS, {
    // pollInterval: 500,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    ssr: false,
    displayName: 'QUERY_GET_ALL_USERS',
    skip: false,
    onCompleted: (data) => console.log('Completed'),
    onError: (error) => console.error(error),
    context: {},

    // partialRefetch: true,
    // client
    // returnPartialData: false,
  });

  if (networkStatus === NetworkStatus.refetch) return <p>'Refetching!'</p>;
  if (loading) return <p>Loading</p>;
  if (error?.message.includes('Access denied')) return <p>Auth Error</p>;
  if (error) return <p>Error Occured</p>;

  return (
    <>
      <p>{`[Query]`} Get All Users</p>

      {(data.Users as IUser[]).map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </>
  );
};

export default GetAllUsers;
