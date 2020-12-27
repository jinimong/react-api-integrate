import React, { useState } from 'react';
import User from './User';
import { useUsersDispatch, useUsersState, getUsers } from './UsersContext';

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { data: users, error, loading } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <dir>Error !!!</dir>;
  if (!users) return <button onClick={fetchData}>Load</button>;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: 'pointer' }}
          >
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>Reload</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
