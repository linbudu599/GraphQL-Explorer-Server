import React, { useState } from 'react';
import { gql, useQuery, NetworkStatus } from '@apollo/client';
import UserItem from "../components/UsertItem";

const QueryUser: React.FC = () => {
    const [queryId, setQueryId] = useState<number>(1);

    const GET_USER_BY_UID = gql`
    query ($uid: Float!) {
      FindUserById(uid: $uid) {
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

    const {
        loading,
        error,
        data,
        refetch,
        networkStatus,
        variables,
        updateQuery,
    } = useQuery(GET_USER_BY_UID, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'cache-first',
        errorPolicy: 'all',
        ssr: false,
        displayName: 'QUERY_GET_USER_BY_UID',
        skip: false,
        onCompleted: (data) => console.log('Completed'),
        onError: (error) => console.error(error),
        context: {},
        variables: { uid: queryId },
    });

    if (networkStatus === NetworkStatus.refetch) return <p>'Refetching!'</p>;
    if (loading) return <p>'Loading'</p>;
    if (error) return <p>'Error Occured'</p>;

    return (
        <>
            <button
                onClick={() => {
                    setQueryId(2);
                    // 不需要调用refetch 变量变化会自动重新调用
                    // refetch();
                }}
            >
                Refetch By UID 2
      </button>
            <p>Query By UID</p>
            <UserItem user={data.FindUserById} />
            <p>Query By Conditions</p>
        </>
    );
};

export default QueryUser;