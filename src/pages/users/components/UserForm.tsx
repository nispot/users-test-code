import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { setError, setSaveStatus } from '../../../stores/users/slice';
import { User, UserWithId } from '../types/types';
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
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('full_name')} *:
                </label>
                <Field
                  type="text"
                  name="name"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.name &&
                    touched.name &&
                    'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                  }`}
                  placeholder="Full Name"
                  required
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm font-medium text-red-900 dark:text-red-400"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('email')} *:
                </label>
                <Field
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ${
                    errors.email &&
                    touched.email &&
                    'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                  }`}
                  type="email"
                  name="email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm font-medium text-red-900 dark:text-red-400"
                />
              </div>
              <div className="flex gap-5">
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('user_name')} *:
                  </label>
                  <Field
                    className={`bg-gray-20 border border-gray-300 cursor-not-allowed text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.username &&
                      touched.username &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="text"
                    name="username"
                    disabled={mode === 'edit'}
                    required
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('age')} *:
                  </label>
                  <Field
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.age &&
                      touched.age &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="number"
                    name="age"
                    required
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('street')} *:
                </label>
                <Field
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.address?.street &&
                    touched.address?.street &&
                    'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                  }`}
                  type="text"
                  name="address.street"
                  required
                />
                <ErrorMessage
                  name="address.street"
                  component="div"
                  className="text-sm font-medium text-red-900 dark:text-red-400"
                />
              </div>
              <div className="flex gap-5">
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('city')} *:
                  </label>
                  <Field
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.address?.city &&
                      touched.address?.city &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="text"
                    name="address.city"
                    required
                  />
                  <ErrorMessage
                    name="address.city"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('zip_code')} *:
                  </label>
                  <Field
                    className={`}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.address?.zip &&
                      touched.address?.zip &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="text"
                    name="address.zip"
                    required
                  />
                  <ErrorMessage
                    name="address.zip"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('phone')} *:
                  </label>
                  <Field
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.phone &&
                      touched.phone &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="text"
                    name="phone"
                    required
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
                <div className="mb-5 w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {t('occupation')} *:
                  </label>
                  <Field
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                      errors.occupation &&
                      touched.occupation &&
                      'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                    }`}
                    type="text"
                    name="occupation"
                    required
                  />
                  <ErrorMessage
                    name="occupation"
                    component="div"
                    className="text-sm font-medium text-red-900 dark:text-red-400"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {t('website')}:
                </label>
                <Field
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.website &&
                    touched.website &&
                    'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
                  }`}
                  type="text"
                  name="website"
                />
                <ErrorMessage
                  name="website"
                  component="div"
                  className="text-sm font-medium text-red-900 dark:text-red-400"
                />
              </div>
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
