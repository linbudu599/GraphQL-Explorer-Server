import React, { useState } from 'react';
import { gql, useQuery, NetworkStatus } from '@apollo/client';
import UserItem from '../components/UsertItem';
import AuthFailed from './auth';

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

    // loading: first invoked
    // setVariables: a query was invoked by calling setVariables
    // fetchMore: fetchMore was invoked
    // refetch: refetch was invoked
    // poll: a polling query was in flight
    // ready: no request is in flight & no errors
    // error: no request is in flight & with errors
    notifyOnNetworkStatusChange: true,

    // cache-first: exec query on cache, will not request server if all data is present
    // cache-only: ..., throw an error if being lacking of data fields
    // cache-and-network: exec on cache & server(use server res to update modified cache fields)
    // network-only
    // no-cache
    // standby: like cache-first, will not update when underlying field values change
    fetchPolicy: 'cache-first',

    // none: discard all query response
    // all: will not discard res, with partial results left
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
  // TODO: enable specific authorization res in server side
  if (error?.message.includes('Access denied')) return <AuthFailed />;
  if (error) return <p>Error Occured</p>;

  return (
    <>
      <p>{`[Query]`} Get All Users</p>

      <button
        onClick={() => {
          startPolling(1000);
        }}
      >
        Start Polling
      </button>

      <br />

      <button
        onClick={() => {
          stopPolling();
        }}
      >
        Stop Polling
      </button>

      <br />

      <button
        onClick={() => {
          refetch();
        }}
      >
        Refetch
      </button>

      {(data.Users as IUser[]).map((user) => (
        <UserItem key={user.uid} user={user} />
      ))}
    </>
  );
};

export default GetAllUsers;
