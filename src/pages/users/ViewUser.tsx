import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchUser } from '../../stores/users/slice';
import { UserAvatar } from './components/UserAvatar';
import { UserProfileCardSkeleton } from './components/UserProfileCardSkeleton';

export const ViewUser = () => {
  const { id } = useParams();
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users,
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  const handleGoBack = () => {
    navigate('/users');
  };

  const handleGoToEditUser = (id: string) => {
    navigate(`/edit-user/${id}`);
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-10">
      {loading ? (
        <div className="flex flex-col items-center pb-10 ">
          <UserProfileCardSkeleton />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="flex flex-col items-center pb-10 ">
          <div className="mb-3">
            <UserAvatar id={currentUser?.id || ''} width={100} />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {currentUser?.name}
          </h5>
          <span className="text-sm text-gray-400 dark:text-gray-400">
            {currentUser?.email}
          </span>
          <section className="flex items-left gap-2 mt-4 flex-col">
            <div className="flex items-left gap-2 mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('age')}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {currentUser?.age}
              </span>
            </div>
            <div className="flex items-left gap-2 mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('occupation')}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {currentUser?.occupation}
              </span>
            </div>
            {currentUser?.website && (
              <div className="flex items-left gap-2 mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('website')}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {currentUser?.website}
                </span>
              </div>
            )}
            <div className="flex items-left gap-2 mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('phone')}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {currentUser?.phone}
              </span>
            </div>
            {currentUser?.hobbies && currentUser?.hobbies.length > 0 && (
              <div className="flex items-left gap-2 mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {t('hobbies')}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  {currentUser?.hobbies.join(', ')}
                </span>
              </div>
            )}
            <div className="flex items-left gap-2 mt-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('address')}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                {`${currentUser?.address?.street}, ${currentUser?.address?.city}, ${currentUser?.address?.zip}`}
              </span>
            </div>
          </section>
          <section className="flex items-left gap-2 mt-8 mt-10 ">
            <button
              onClick={() => handleGoToEditUser(`${currentUser?.id}`)}
              type="button"
              className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t('edit_user')}
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handleGoBack}
            >
              {t('go_back_list')}
            </button>
          </section>
        </div>
      )}
    </div>
  );
};
