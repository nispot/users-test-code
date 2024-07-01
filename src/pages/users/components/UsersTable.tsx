import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { MouseEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { removeUser, setError } from '../../../stores/users/slice';
import { UserAvatarCard } from './UserAvatarCard';
import UserTableSkeleton from './UserTableSkeleton';

export const UsersTable = () => {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemoveUser = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    dispatch(removeUser(id));
  };

  const handleEditUser = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string,
  ) => {
    e.stopPropagation();
    navigate(`/edit-user/${id}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(setError(null));
  }, [error, dispatch]);

  const handleViewUser = (id: string) => {
    navigate(`/view-user/${id}`);
  };

  return (
    <>
      {loading ? (
        <UserTableSkeleton />
      ) : error === 'Failed to fetch users' ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700 dark:text-gray-200 dark:text-white dark:bg-gray-800  ">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {t('name')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {t('phone')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {t('website')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {t('occupation')}
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 dark:border-gray-700 dark:divide-gray-700">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleViewUser(user.id)}
              >
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900 dark:text-white">
                  <UserAvatarCard
                    id={user.id}
                    name={user.name}
                    email={user.email}
                  />
                </td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.occupation}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={(e) => {
                        handleRemoveUser(e, user.id);
                      }}
                    >
                      <TrashIcon className="size-6 text-gray-500 dark:text-gray-200" />
                    </button>
                    <button onClick={(e) => handleEditUser(e, user.id)}>
                      <PencilSquareIcon className="size-6 text-gray-500 dark:text-gray-200" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
