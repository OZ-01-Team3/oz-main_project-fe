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
      <div className="flex flex-row items-center justify-center pt-3 px-2 cursor-pointer ">
        {/* <UserCircleIcon className="w-14 h-14  " /> */}
        <div className="w-14 h-14 aspect-[1/1] border-mainBlack rounded-full border">
          <img
            src={profile}
            className="w-full h-full object-cover rounded-full"
            alt="프로필 이미지"
          />
        </div>
        <div className="flex flex-col items-start justify-center w-72 mx-5 ">
          <p className="text-sm font-semibold">{user}</p>

          <p className="text-sm font-light">
            {content.length > 40 ? `${content.substring(0, 40)}...` : content}
          </p>
          <p className="text-xs font-thin mt-1">{time}</p>
        </div>
        <div className="w-20 h-20 aspect-[1/1] border-gray rounded-md border">
          <img
            src={product}
            className="w-full h-full object-cover  rounded-md"
          />
        </div>
      </div>
      <div className="flex-1 border-b mx-auto mt-2 border-hrGray"></div>
    </>
  );
};

export default ChatLIst;
