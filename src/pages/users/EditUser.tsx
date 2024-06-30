import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { editUser, fetchUser } from '../../stores/users/slice';
import { UserForm } from './components/UserForm';
import { UserWithId } from './types/types';

export const EditUser = () => {
  const { id } = useParams();
  const { currentUser, loading } = useAppSelector((state) => state.users);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [id, dispatch]);

  const handleEditSubmit = (values: UserWithId) => {
    dispatch(editUser(values));
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {t('edit_user')}
      </h1>
      {!currentUser && !loading ? (
        <div>{t('no_current_user')}</div>
      ) : (
        currentUser && (
          <UserForm
            mode="edit"
            initialValues={currentUser}
            onSubmit={handleEditSubmit}
          />
        )
      )}
    </div>
  );
};
