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
    <div className="w-3/5  flex flex-col justify-center items-center pl-10  relative">
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
        <hr className="w-4/5 mx-auto text-mainWhite" />
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

            {/* 시간 채팅방 묶은거 */}
            <div className="flex justify-start items-center">
              <div className="flex flex-row-reverse items-center rounded-full pl-2">
                <p className="text-xs mb-1">오후 10:02</p>
                <div className="bg-mainWhite text-mainBlack text-sm rounded-lg px-4 py-2 max-w-md">
                  <img
                    src="https://image.msscdn.net/images/goods_img/20231124/3732933/3732933_17008179351517_320.png"
                    alt="상품 이미지"
                    className="w-20 h-20 mr-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 입력창 */}
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
