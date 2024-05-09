import { CameraIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

const ChatInput = () => {
  return (
    <div className="flex items-center justify-between pb-1 ">
      <div className="w-10 h-10 bg-chatBg  rounded-full flex justify-center items-center">
        <CameraIcon className="w-7 h-7  cursor-pointer" />
      </div>
      <div className="flex flex-row justify-between bg-chatBg rounded-full w-full">
        <input
          placeholder="메시지를 입력하세요"
          className="w-full  bg-chatBg rounded-full text-sm px-4 border-gray"
        />
        <div className="w-10 h-10 bg-chatBg rounded-full flex justify-center items-center">
          <PaperAirplaneIcon className="w-7 h-7 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
