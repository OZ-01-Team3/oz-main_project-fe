
import useUserStore from "@/stores/userStore";
import { useState } from "react";
interface ChatInputProps {
  content: string | any;
  time: string;
  subject: string;
  img?: string;
  read?: boolean;
  profile_img?: string
}

const ChatBubble = ({ content, time, subject, img, read, profile_img }: ChatInputProps) => {
  const { user } = useUserStore()
  const [formattedTime, setFormattedTime] = useState<string>('');

  // 상대방의 이미지만 보이도록 조건 추가
  const showOpponentImage = subject !== `${user?.nickname}` && profile_img;

  // 시간 함수
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${ampm} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  // 컴포넌트가 렌더링될 때 시간을 형식화
  useState(() => {
    setFormattedTime(formatTime(time));
  }, [time]);


  const justifyStyle =
    subject === `${user?.nickname}` ? 'flex justify-end items-center mt-3' : 'flex justify-start items-center mt-3  relative';
  const flexStyle = subject === `${user?.nickname}` ? 'flex flex-row items-end px-2   ' : 'flex flex-row-reverse items-end ';

  const inputColor =
    subject === `${user?.nickname}`
      ? 'bg-mainBlack text-mainWhite text-sm rounded-lg px-4 py-2 max-w-64 '
      : ' border-mainBlack border text-mainBlack text-sm rounded-lg px-4 py-2 max-w-64';
  return (
    // 시간+채팅창 왼쪽 오른쪽 지정하는 스타일
    <div className={justifyStyle}>
      {/* 시간, 채팅창 정렬 바꾸는 스타일 */}
      <div className={flexStyle}>
        {read && <p className="text-footerText  mb-1 font-light ">안읽음</p>}
        <p className="text-xs mb-1 mx-2">{formattedTime}</p>
        {img ? (
          <div className="flex flex-col gap-y-2">
            <div className={inputColor}>{content}</div>
            <div className={inputColor}>
              <img src={img} alt="이미지" className="mt-2 w-full object-cover h-32" />
            </div>
          </div>
        ) : (
          <div className={inputColor}>{content}</div>
        )
        }
        {showOpponentImage && <img src={profile_img} className="w-9 rounded-full border mr-2 " />}
      </div>
    </div>
  );
};

export default ChatBubble;
