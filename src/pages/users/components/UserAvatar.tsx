export const UserAvatar = ({
  id,
  width = 42,
}: {
  id: string;
  width?: number;
}) => {
  const urlPhoto: string = ((id) => {
    if (!id) {
      return '/blank-profile.webp';
    }
    const regex = /\d{2}/;
    const match = id.match(regex);
    const idPhoto: number = match
      ? Number(match[0])
      : Math.floor(Math.random() * 100);
    const genderPhoto = idPhoto < 50 ? 'men' : 'women';
    return `https://randomuser.me/api/portraits/${genderPhoto}/${idPhoto}.jpg`;
  })(id);

  return (
    <div className={`relative h-${width} w-${width}`}>
      <img
        className={`h-${width} w-${width} rounded-full object-cover object-center shadow-lg`}
        src={urlPhoto}
        alt=""
        width={width}
        height={width}
      />
      {/*  <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
    </div>
  );
};
