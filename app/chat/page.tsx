import Chat from "@/components/Chat/Chat";
import ChatLists from "@/components/Chat/ChatLists";
const chat = [];
const page = () => {
  return (
    <div className="w-full h-[calc(100vh-99.59px)] bg-white  text-mainBlack px-32">
      <div className="text-2xl pl-6 h-14 flex items-center font-semibold">
        채팅
      </div>
      {/* 반반 나누는ㄴ 레이아웃 */}
      <div className="flex flex-row w-full h-[calc(100%-70px)] ">
        {/* 채팅목록 */}
        <div className="w-2/5 pl-3 pr-10 border-r-[1px] border-gray  overflow-y-scroll scrollbar-hide">
          <ChatLists />
        </div>
        {/* 채팅방 */}
        <Chat />
      </div>
    </div>
  );
};

export default page;
