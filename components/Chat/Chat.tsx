import ChatBubble from "./\bChatBubble";
import ChatInput from "./ChatInput";
const chatData = [
  {
    subject: "me",
    content: "임대용이 채팅 다 해오라고 했다",
    time: "오후 10:02",
  },
  { subject: "me", content: "나 광광운다", time: "오후 10:02" },
  { subject: "other", content: "ㄹㄹ라ㅏ라라ㅏ라라", time: "오후 10:02" },
  {
    subject: "other",
    content: "이렇게 하면 되려나 누가보냈느냐에 따라 클래스 바꿔주기",
    time: "오후 10:02",
  },
  {
    subject: "me",
    content: "된당!!",
    time: "오후 10:02",
  },
  {
    subject: "me",
    content: "이건 누가 보냈게",
    time: "오후 10:02",
  },
  {
    subject: "me",
    content: "재밌고만!!",
    time: "오후 10:02",
  },
];
const Chat = () => {
  return (
    <div className="w-3/5 flex flex-col justify-center items-center pl-10 relative">
      <div className="flex w-full flex-col justify-between h-screen overflow-y-scroll scrollbar-hide ">
        <div className="flex justify-center items-center flex-col">
          <div className="w-24 aspect-[1/1] mr-2 border-mainBlack rounded-full border ">
            <img
              src="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
              className="w-full h-full object-cover rounded-full"
              alt="프로필 이미지"
            />
          </div>
          <div className="text-2xl my-3">하염빵</div>
        </div>
        {/* 날짜 수평선 */}
        <div className="flex items-center justify-center space-x-2 w-5/6 m-auto">
          <div className="flex-1 border-b  border-hrGray"></div>
          <div className="text-subGray text-xs font-didot bg-mainWhite px-2">
            2024.05.09
          </div>
          <div className="flex-1 border-b border-hrGray"></div>
        </div>
        {/* 채팅창 */}
        <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide pb-3 ">
          <div className="flex flex-col justify-between mt-4">
            {chatData.map((data, index) => (
              <ChatBubble
                key={index}
                content={data.content}
                time={data.time}
                subject={data.subject}
              />
            ))}
          </div>
        </div>
        {/* 입력창 */}
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
