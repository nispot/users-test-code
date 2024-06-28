export const UserAvatar = ({ i }: { i: number }) => {
  return (
    <div className="relative h-10 w-10">
      <img
        className="h-full w-full rounded-full object-cover object-center"
        src={`https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${i}.jpg`}
        alt=""
      />
      {/*  <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span> */}
    </div>
  );
};
