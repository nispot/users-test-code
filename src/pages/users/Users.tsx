import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useAppDispatch } from '../../hooks/store';
import { fetchUsers } from '../../stores/users/slice';
import { UsersTable } from './components/UsersTable';

import { useTranslation } from 'react-i18next';

export const Users = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    navigate('/add-user');
  };
  return (
    <div className="container">
      <Toaster richColors />
      <div className="flex justify-between items-center">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {t('users_list')}
        </h1>
        <div className="block">
          <button
            onClick={handleAddUser}
            className="px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {t('add_user')}
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200  dark:border-gray-600 shadow-md m-5">
        <UsersTable />
      </div>
    </div>
  );
};
