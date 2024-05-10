interface ChatInputProps {
  content: string | any;
  time: string;
  subject: string;
  img?: string;
  read?: boolean;
}

const ChatBubble = ({ content, time, subject, img, read }: ChatInputProps) => {
  const justifyStyle =
    subject === 'me' ? 'flex justify-end items-center mt-3' : 'flex justify-start items-center mt-3  relative';
  const flexStyle = subject === 'me' ? 'flex flex-row items-end px-2   ' : 'flex flex-row-reverse items-end pl-11';

  const inputColor =
    subject === 'me'
      ? 'bg-mainBlack text-mainWhite text-sm rounded-lg px-4 py-2 max-w-64 '
      : ' border-mainBlack border text-mainBlack text-sm rounded-lg px-4 py-2 max-w-64';
  return (
    // 시간+채팅창 왼쪽 오른쪽 지정하는 스타일
    <div className={justifyStyle}>
      {/* 시간, 채팅창 정렬 바꾸는 스타일 */}
      <div className={flexStyle}>
        {!read && <p className="text-footerText  mb-1 font-light ">안읽음</p>}
        <p className="text-footerText mb-1 mx-2">{time}</p>
        <div className={inputColor}>{content}</div>
        {img && <img src={img} className="w-9 rounded-full border mr-2 absolute left-0 top-0" />}
      </div>
    </div>
  );
};

export default ChatBubble;
