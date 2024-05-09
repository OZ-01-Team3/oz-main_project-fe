import Chat from "@/components/Chat/Chat";
import ChatLists from "@/components/Chat/ChatLists";
const chat = [];
const page = () => {
  return (
    <div className="sm:w-full h-[calc(100vh-99.59px)] bg-white text-mainBlack xl:px-32 sm:px-10 md:px-10 lg:px-10 ">
      <div className="text-2xl pl-6 h-14 flex items-center font-semibold sm:justify-center md:justify-start">
        채팅
      </div>
      {/* 반반 나누는ㄴ 레이아웃 */}
      <div className="flex  w-full h-[calc(100%-70px)] md:flex-row 2xl:flex-row ">
        {/* 채팅목록 */}
        <div className="w-2/5 pl-3 pr-5 border-r-[1px] border-gray overflow-y-scroll scrollbar-hide sm:w-20  ">
          <ChatLists />
        </div>
        {/* 채팅방 */}
        <Chat />
      </div>
    </div>
  );
};

export default page;
