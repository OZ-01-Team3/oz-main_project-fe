interface ChatListProps {
  user: string;
  content: string;
  time: string;
  product: string;
  profile?: string;
}
const UserResponseCss =
  "flex flex-col items-start justify-center w-72 pr-1  h-18 md:mr-0 ml-1 md:h-20";
const ProductResCss = "w-16 h-16 aspect-[1/1] border-gray rounded-md border ";

const ChatLIst = ({ user, content, time, profile, product }: ChatListProps) => {
  return (
    <>
      <div className="flex flex-row items-center justify-center  px-2 cursor-pointer  flex-none  md:px-0 ">
        <div className="w-14 h-14 aspect-[1/1] border-mainBlack rounded-full border md:w-12 md:h-12 mr-2">
          <img
            src={profile}
            className="w-full h-full  object-cover rounded-full"
            alt="프로필 이미지"
          />
        </div>
        <div className={`sm:hidden md:${UserResponseCss}  `}>
          <p className="text-sm h-5 overflow-hidden  font-semibold ">{user}</p>

          <p className="text-[12px] font-light overflow-hidden h-11 md:h-9 sm:text-xs">
            {content.length > 30 ? `${content.substring(0, 30)}...` : content}
          </p>
          <p className="text-xs font-thin">{time}</p>
        </div>
        <div className={`xl:${ProductResCss} lg:hidden md:hidden sm:hidden`}>
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
