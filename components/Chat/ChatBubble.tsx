'use client'

import useUserStore from "@/stores/userStore";
interface ChatInputProps {
  content: string | any;
  time: string;
  subject: string;
  img?: string;
  read?: boolean;
}

const ChatBubble = ({ content, time, subject, img, read }: ChatInputProps) => {
  const { user } = useUserStore()

  // 상대방의 이미지만 보이도록 조건 추가
  const showOpponentImage = subject !== `${user?.nickname}` && img;


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
        <p className="text-footerText mb-1 mx-2">{time}</p>
        <div className={inputColor}>{content}</div>
        {showOpponentImage && <img src={img} className="w-9 rounded-full border mr-2 " />}
      </div>
    </div>
  );
};

export default ChatBubble;
