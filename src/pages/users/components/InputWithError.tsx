import { ErrorMessage, Field, FormikErrors, FormikTouched } from 'formik';

export const InputWithError = <T extends object>({
  name,
  label,
  type = 'text',
  required = false,
  disabled = false,
  errors,
  touched,
}: InputWithErrorProps<T>) => {
  const error = getNestedValue(errors, name as string);
  const isTouched = getNestedValue(touched, name as string);

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {required && '*'}
      </label>
      <Field
        type={type}
        name={name}
        disabled={disabled}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
          error &&
          isTouched &&
          'border-red-500 border placeholder-red-500 text-red-900 focus:border-red-500'
        }`}
      />
      <ErrorMessage
        name={name as string}
        component="div"
        className="text-sm font-medium text-red-900 dark:text-red-400"
      />
    </div>
  );
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type NestedKey<T extends object> = NestedKeyOf<T>;

interface InputWithErrorProps<T extends object> {
  name: NestedKey<T>;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
}

const getNestedValue = <T extends object>(obj: T, path: string): unknown => {
  return path.split('.').reduce<unknown>((value, key) => {
    return value && (value as Record<string, unknown>)[key];
  }, obj);
};
