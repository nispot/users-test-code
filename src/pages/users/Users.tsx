import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/store';
/* import { getUsers } from '../../stores/users/thunks'; */
import { fetchUsers } from '../../stores/users/slice';
import { UsersTable } from './components/UsersTable';
export const Users = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <h1>Users List</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <UsersTable />
      </div>
    </div>
  );
};
