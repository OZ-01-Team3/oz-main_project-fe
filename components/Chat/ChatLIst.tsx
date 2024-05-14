'use client'

import useChatRoomStore from "@/stores/chatRoomStore";
import { useEffect, useState } from "react";

interface ChatListProps {
  user: string;
  chatId: number;
  content: string;
  time: string;
  product: string;
  profile?: string;
  message?: string;
}
const UserResponseCss = 'flex flex-col items-start justify-center w-72 pr-1  h-18 md:mr-0 ml-1 md:h-20 pt-2';
const ProductResCss = 'w-16 h-16 aspect-[1/1] border-gray rounded-md border ';

const ChatLIst = ({ chatId, user, content, time, profile, product, message }: ChatListProps) => {
  const [formattedTime, setFormattedTime] = useState(formatTime(time));
  const setChatRoomId = useChatRoomStore((state) => state.setChatRoomId)

  const handleClickChatRoom = () => {
    setChatRoomId(chatId)
    console.log("채팅룸 아이디", chatId)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTime(time));
    }, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, [time, formattedTime, setFormattedTime]);



  return (
    <>
      <div className="flex flex-row items-center justify-center  px-2 cursor-pointer  flex-none  md:px-0 sm:pt-2" onClick={handleClickChatRoom}>
        <div className="w-14 h-14 aspect-[1/1] border-mainBlack rounded-full border md:w-12 md:h-12 mr-2">
          <img src={profile} className="w-full h-full  object-cover rounded-full" alt="프로필 이미지" />
        </div>
        <div className={`sm:hidden md:${UserResponseCss}  `}>
          <div className="flex flex-row items-center">
            <p className=" h-5 overflow-hidden  font-semibold mr-1">{user}</p>
            {message !== '0' && (
              <p className="bg-[#D80C18] w-4 h-4 rounded-full flex justify-center items-center text-mainWhite text-[10px]">
                {message}
              </p>
            )}
          </div>

          <p className="text-sm overflow-hidden h-10 md:h-8 sm:text-xs text-subGray">
            {content.length > 30 ? `${content.substring(0, 30)}...` : content}
          </p>
          <p className="text-[12px] text-subGray">{formattedTime}</p>
        </div>
        <div className={`xl:${ProductResCss} lg:hidden md:hidden sm:hidden`}>
          <img src={product} className="w-full h-full object-cover  rounded-md" />
        </div>
      </div>
      <div className="flex-1 border-b mx-auto mt-2 border-hrGray"></div>
    </>
  );
};

// 시간포맷함수
const formatTime = (timestamp: number | string) => {
  const now = new Date();
  const targetTime = new Date(timestamp);
  const diff = now.getTime() - targetTime.getTime();
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < minute) {
    return "방금";
  } else if (diff < hour) {
    const minutesAgo = Math.floor(diff / minute);
    return `${minutesAgo}분 전`;
  } else if (diff < day) {
    const hoursAgo = Math.floor(diff / hour);
    return `${hoursAgo}시간 전`;
  } else {
    // 일이 지난 경우에는 원하는 형식으로 포맷팅
    const year = targetTime.getFullYear();
    const month = targetTime.getMonth() + 1;
    const dayOfMonth = targetTime.getDate();
    return `${year}.${month}.${dayOfMonth}`;
  }
};

export default ChatLIst;
