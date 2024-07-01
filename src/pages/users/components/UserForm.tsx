import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { setError, setSaveStatus } from '../../../stores/users/slice';
import { User, UserWithId } from '../types/types';
import { InputWithError } from './InputWithError';
import { LoadingSvg } from './LoadingSvg';
import { UserAvatar } from './UserAvatar';

interface UserFormBaseProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
}

interface CreateProps extends UserFormBaseProps<User> {
  mode: 'create';
}

interface EditProps extends UserFormBaseProps<UserWithId> {
  mode: 'edit';
}

type UserFormProps = CreateProps | EditProps;

export const UserForm: React.FC<UserFormProps> = ({
  mode,
  initialValues,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const id = mode === 'edit' ? (initialValues as UserWithId).id : '';
  const { loading, error, saveStatus } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const urlValidation = Yup.string().matches(
    /^(https?:\/\/)?((([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6})|(([a-zA-Z0-9-]{1,63}\.)?[a-zA-Z0-9-]{1,63}\.[a-zA-Z]{2,6}))(:[0-9]{1,5})?(\/.*)?$/,
    t('invalid_url'),
  );

  const UserSchema = Yup.object().shape({
    name: Yup.string().required(`${t('name')} ${t('is_required')}`),
    age: Yup.number()
      .required(`${t('age')} ${t('is_required')}`)
      .min(0, `${t('age')} ${t('positive_error')}`),
    username: Yup.string().required(`${t('user_name')} ${t('is_required')}`),
    email: Yup.string()
      .email(t('invalid_email'))
      .required(`Email ${t('is_required')}`),
    address: Yup.object().shape({
      street: Yup.string().required(`${t('street')} ${t('is_required')}`),
      city: Yup.string().required(`${t('city')} ${t('is_required')}`),
      zip: Yup.string().required(`${t('zip')}  ${t('is_required')}`),
    }),
    phone: Yup.string().required(`${t('phone')}  ${t('is_required')}`),
    website: urlValidation,
    occupation: Yup.string().required(`${t('occupation')} ${t('is_required')}`),
    hobbies: Yup.array().of(Yup.string()),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(setError(null));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (saveStatus === 'succeeded') {
      toast.success('User saved');
    }
    dispatch(setSaveStatus('idle'));
  }, [saveStatus, dispatch]);

  const handleCencel = () => {
    navigate('/users');
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pt-10">
      <Toaster richColors />
      <div className="flex flex-col items-center pb-10 ">
        <div className="mb-3 block w-22">
          <UserAvatar id={id} width={150} />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            onSubmit(values as UserWithId);
          }}
        >
          {({ values, handleSubmit, errors, touched }) => (
            <Form
              className="w-1/2 mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-5">
                <InputWithError
                  name="name"
                  label={t('full_name')}
                  required
                  errors={errors}
                  touched={touched}
                />
              </div>
              <InputWithError
                name="email"
                label={t('email')}
                type="email"
                required
                errors={errors}
                touched={touched}
              />
              <div className="flex gap-5">
                <div className="flex-1">
                  <InputWithError
                    name="username"
                    label={t('user_name')}
                    required
                    disabled={mode === 'edit'}
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className="flex-1">
                  <InputWithError
                    name="age"
                    label={t('age')}
                    type="number"
                    required
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              <InputWithError
                name="address.street"
                label={t('street')}
                required
                errors={errors}
                touched={touched}
              />
              <div className="flex gap-5 ">
                <div className="flex-1">
                  <InputWithError
                    name="address.city"
                    label={t('city')}
                    required
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className="flex-1">
                  <InputWithError
                    name="address.zip"
                    label={t('zip_code')}
                    required
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="flex-1">
                  <InputWithError
                    name="phone"
                    label={t('phone')}
                    required
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <div className="flex-1">
                  <InputWithError
                    name="occupation"
                    label={t('occupation')}
                    required
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>
              <InputWithError
                name="website"
                label={t('website')}
                errors={errors}
                touched={touched}
              />
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('hobbies')}:
                </label>
                <FieldArray name="hobbies">
                  {({ remove, push }) => (
                    <div className="flex gap-2 flex-wrap items-center">
                      {values?.hobbies?.map((hobby, index) => (
                        <div key={index}>
                          <Field
                            aria-label={hobby}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 inline m-1 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name={`hobbies.${index}`}
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            {t('x')}
                          </button>
                          <ErrorMessage
                            name={`hobbies.${index}`}
                            component="div"
                            className="text-sm font-medium text-red-900 dark:text-red-400"
                          />
                        </div>
                      ))}
                      <button
                        className="px-2 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={() => push('')}
                      >
                        {t('add_hobby')}
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="flex justify-center items-center gap-5 mt-10">
                <button
                  type="submit"
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {loading && <LoadingSvg />}
                  {loading ? t('saving') : t('save')}
                </button>
                <button
                  type="button"
                  className=" px-3 py-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleCencel}
                >
                  Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
