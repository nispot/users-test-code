import { UserAvatar } from './UserAvatar';

export const UserAvatarCard = ({
  name,
  email,
  id,
}: {
  name: string;
  email: string;
  id: string;
}) => {
  return (
    <>
      <UserAvatar id={id} />
      <div className="text-sm">
        <div className="font-medium text-gray-700 dark:text-gray-200">{`${name}`}</div>
        <div className="text-gray-400">{email}</div>
      </div>
    </>
  );
};
