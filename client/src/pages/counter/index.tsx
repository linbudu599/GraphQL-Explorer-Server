import React from 'react';
import { gql, useQuery, NetworkStatus, useMutation } from '@apollo/client';

import CounterType from '../../local/Counter/counter.type';

// Apollo Local State Management
const Counter: React.FC = () => {
  const { data, loading } = useQuery<{ counter: CounterType }>(gql`
    query {
      counter @client {
        value
      }
    }
  `);
  console.log(data);
  const [increment] = useMutation<() => void>(gql`
    mutation {
      incrementCounter @client
    }
  `);

  const [decrement] = useMutation<() => void>(gql`
    mutation {
      decrementCounter @client
    }
  `);

  return (
    <>
      <h1>Counter:</h1>
      {/* <h2>{loading ? 'Loading...' : data!.counter.value}</h2> */}
      <button onClick={() => increment()}>Increment</button>;
      <button onClick={() => decrement()}>Decrement</button>;
    </>
  );
};

export default Counter;
