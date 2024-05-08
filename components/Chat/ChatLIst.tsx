interface ChatListProps {
  user: string;
  content: string;
  time: string;
  product: string;
  profile?: string;
}
const ChatLIst = ({ user, content, time, profile, product }: ChatListProps) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center pt-3 px-2  ">
        {/* <UserCircleIcon className="w-14 h-14  " /> */}
        <div className="w-16 aspect-[1/1] mr-2 border-mainBlack rounded-full border">
          <img
            src={profile}
            className="w-full h-full object-cover rounded-full"
            alt="프로필 이미지"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-4/6">
          <p className="text-sm font-semibold">{user}</p>
          <p className="text-sm">{content}</p>
          <p className="text-xs text-subGray mt-1">{time}</p>
        </div>
        <img src={product} className="w-20 h-20" />
      </div>
      <hr className=" w-4/5 mx-auto mt-3 text-mainWhite " />
    </>
  );
};

export default ChatLIst;
