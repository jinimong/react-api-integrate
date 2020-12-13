import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, []);
  const { loading, data: users, error } = state;

  if (loading) return <div>Loading ...</div>;
  if (error) return <dir>Error !!!</dir>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>Reload</button>
    </>
  );
}

export default Users;
