import productsDetails from "@/productDetailData";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
const chatData = [
  {
    subject: "me",
    content: "임대용이 채팅 다 해오라고 했다",
    time: "오후 10:02",
  },
  { subject: "me", content: "나 광광운다", time: "오후 10:02" },
  {
    subject: "other",
    content: "ㄹㄹ라ㅏ라라ㅏ라라",
    time: "오후 10:02",
    img: "https://i.pinimg.com/474x/40/c3/98/40c398cf13f290e3bb364b7a7358524b.jpg",
  },
  {
    subject: "other",
    content:
      "이렇게 하면 되려나 누가보냈느냐에 따라 클래스 바꿔주기 내용이 이렇게 길어지면 어떻게되려나",
    time: "오후 10:02",
    img: "https://i.pinimg.com/474x/40/c3/98/40c398cf13f290e3bb364b7a7358524b.jpg",
  },
  {
    subject: "me",
    content:
      "어어어어어어어어어어어엄청나게 긴 메시지~~ 입니다 ~~~~~~~~~~~~~라라어어어어어어어어어어어엄청나게 긴 메시지~~ 입니다 ~~~~~~~~~~~~~라라어어어어어어어어어어어엄청나게 긴 메시지~~ 입니다 ~~~~~~~~~~~~~라라라라ㅏㅏㅏㅏ라ㅏㄹ라라ㅏ 엄청 긴 메시지 엄청 나게 길 다",
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
        <div className="flex flex-col">
          {/* 사용자 정보 */}
          <div className="flex justify-center items-center flex-row">
            <div className="w-10 aspect-[1/1] mr-2 border-mainBlack rounded-full border ">
              <img
                src="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
                className="w-full h-full object-cover rounded-full"
                alt="프로필 이미지"
              />
            </div>
            <div className="text-2xl my-3">하염빵</div>
          </div>
          {/* 상품정보 */}
          {productsDetails.map((item) => (
            <div
              className="flex flex-row justify-left items-center h-16 my-3"
              key={item.id}
            >
              {/* 상품이미지 */}
              <div className=" h-14 w-14 border-mainBlack flex justify-center items-center ">
                <img
                  src={item.image}
                  alt="상품이미지 "
                  className="object-cover w-14 h-14"
                />
              </div>
              {/* 상품상세정보 */}
              <div className="flex flex-col justify-center w-1/3 ml-3 h-14">
                <p className="text-[11px] font-semibold">{item.title}</p>

                <p className="text-[10px] font-thin">
                  {" "}
                  {item.description.length > 50
                    ? `${item.description.substring(0, 50)}...`
                    : item.description}
                </p>
                <p className="text-[10px]">대여비 {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 날짜 수평선 */}
        <div className="flex items-center justify-center space-x-2  ">
          <div className="flex-1 border-b  border-hrGray"></div>
          <div className="text-subGray text-[11px]  bg-mainWhite px-2">
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
                img={data.img}
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
