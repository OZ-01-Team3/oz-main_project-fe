'use client'
import { CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ChatProps {
  sendMessage: (message: string) => void;
}

const ChatInput = ({ sendMessage }: ChatProps) => {
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    sendMessage(inputMessage);
    setInputMessage(""); // 메시지 전송 후 입력 필드 초기화
  }
  return (
    <div className="flex items-center justify-between pb-1 ">
      <div className="w-10 h-10 bg-chatBg  rounded-full flex justify-center items-center">
        <CameraIcon className="w-7 h-7  cursor-pointer" />
      </div>
      <div className="flex flex-row justify-between bg-chatBg rounded-full w-full">
        <input placeholder="메시지를 입력하세요" className="w-full  bg-chatBg rounded-full text-sm px-4 border-gray" onChange={(e) => setInputMessage(e.target.value)}
          value={inputMessage} />
        <button
          className="w-10 h-10 bg-chatBg rounded-full flex justify-center items-center"
          onClick={handleSend}
        >
          <PaperAirplaneIcon className="w-7 h-7 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
