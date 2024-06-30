import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../hooks/store';
import { addUser } from '../../stores/users/slice';
import { UserForm } from './components/UserForm';
import { User } from './types/types';

export const AddUser = () => {
  const initialUserValues: User = {
    name: '',
    age: 0,
    username: '',
    email: '',
    address: {
      street: '',
      city: '',
      zip: '',
    },
    phone: '',
    website: '',
    occupation: '',
    hobbies: [''],
  };
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleCreateSubmit = (values: User) => {
    dispatch(addUser(values));
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {t('add_user')}
      </h1>
      <UserForm
        mode="create"
        initialValues={initialUserValues}
        onSubmit={handleCreateSubmit}
      />
    </div>
  );
};
