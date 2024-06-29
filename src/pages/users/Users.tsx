import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useAppDispatch } from '../../hooks/store';
import { fetchUsers } from '../../stores/users/slice';
import { UsersTable } from './components/UsersTable';

export const Users = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <Toaster />
      <h1>Users List</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <UsersTable />
      </div>
    </div>
  );
};
