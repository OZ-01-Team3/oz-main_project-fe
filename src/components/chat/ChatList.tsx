import useChatRoomStore from "@/stores/useChatRoomStore";
import useMessageStore from "@/stores/useMessageStore";
import { useEffect, useState } from "react";

interface ChatListProps {
  id: number;
  user: string;
  chatId: number;
  content: string;
  time: string;
  product: string;
  profile?: string;
  notification?: string | number;
}

const UserResponseCss = 'flex flex-col items-start justify-center w-72 pr-1  h-18 md:mr-0 ml-1 md:h-20 pt-2';
const ProductResCss = 'w-16 h-16 aspect-[1/1] border-gray rounded-md border ';

const ChatList = ({ chatId, id, user, content, time, profile, product, notification }: ChatListProps) => {
  const [formattedTime, setFormattedTime] = useState(formatTime(time));
  const [displayContent, setDisplayContent] = useState('');
  const setChatRoomId = useChatRoomStore((state) => state.setChatRoomId);
  const messages = useMessageStore((state => state.messages));

  const handleClickChatRoom = () => {
    setChatRoomId(chatId);
    console.log("채팅룸 아이디", chatId);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTime(time));
    }, 60000); // 1분마다 갱신
    return () => clearInterval(interval);
  }, [time]);

  /** messages 배열이 업데이트 될때마다 실행되는 useEffect */
  useEffect(() => {
    // chatId와 일치하는 메시지만 필터링
    const relevantMessages = messages.filter((message) => message.last_message?.chatroom === id);
    console.log("Relevant Messages:", relevantMessages);

    // 가장 최근의 채팅만 표시하기 위해 messages 배열이 비어있지 않은 경우에만 실행
    if (relevantMessages.length > 0) {
      // 가장 최근의 채팅을 가져옴
      const latestMessage = relevantMessages[relevantMessages.length - 1];
      console.log("Latest Message:", latestMessage);

      // 최근 메세지가 있으면서 message 속성이 있는 경우
      if (latestMessage && latestMessage.message) {
        setDisplayContent(latestMessage.message.length > 30 ? `${latestMessage.message.substring(0, 30)}...` : latestMessage.message);
        setFormattedTime(formatTime(latestMessage.timestamp));
      } else {
        setDisplayContent(content.length > 30 ? `${content.substring(0, 30)}...` : content);
      }
    } else {
      setDisplayContent(content.length > 30 ? `${content.substring(0, 30)}...` : content);
      setFormattedTime(formatTime(time));
    }
  }, [messages, content, chatId, time]);

  return (
    <>
      <div className="flex flex-row items-center justify-center  px-2 cursor-pointer  flex-none  md:px-0 sm:pt-2" onClick={handleClickChatRoom}>
        <div className="w-14 h-14 aspect-[1/1] border-mainBlack rounded-full border md:w-12 md:h-12 mr-2">
          <img src={profile} className="w-full h-full  object-cover rounded-full" alt="프로필 이미지" />
        </div>
        <div className={`sm:hidden md:${UserResponseCss}  `}>
          <div className="flex flex-row items-center">
            <p className=" h-5 overflow-hidden  font-semibold mr-1">{user}</p>
            {notification !== 0 && (
              <p className="bg-[#D80C18] w-4 h-4 rounded-full flex justify-center items-center text-mainWhite text-[10px]">
                {notification}
              </p>
            )}
          </div>

          <p className="text-sm overflow-hidden h-10 md:h-8 sm:text-xs text-subGray">
            {displayContent}
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
    return '방금';
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

export default ChatList;
