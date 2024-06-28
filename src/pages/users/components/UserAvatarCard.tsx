import { UserAvatar } from './UserAvatar';

export const UserAvatarCard = ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const i = Math.floor(Math.random() * 100);
  return (
    <>
      <UserAvatar i={i} />
      <div className="text-sm">
        <div className="font-medium text-gray-700">{`${name}`}</div>
        <div className="text-gray-400">{email}</div>
      </div>
    </>
  );
};
