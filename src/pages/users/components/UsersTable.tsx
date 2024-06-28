import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/store';
import { UserAvatarCard } from './UserAvatarCard';
import UserTableSkeleton from './UserTableSkeleton';

export const UsersTable = () => {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const { t } = useTranslation();
  return (
    <>
      {loading ? (
        <UserTableSkeleton />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">
                {t('name')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">
                {t('phone')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">
                {t('website')}
              </th>
              <th className="px-6 py-4 font-medium text-gray-900">
                {t('occupation')}
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <UserAvatarCard name={user.name} email={user.email} />
                </td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>{user.occupation}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <a x-data="{ tooltip: 'Delete' }" href="#">
                      <TrashIcon className="size-6 text-gray-500" />
                    </a>
                    <a x-data="{ tooltip: 'Edite' }" href="#">
                      <PencilSquareIcon className="size-6 text-gray-500" />
                    </a>
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
