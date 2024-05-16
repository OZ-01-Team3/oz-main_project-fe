
import chatRequests from '@/api/chatRequests';
import instance from '@/api/instance';
import useChatRoomStore from '@/stores/chatRoomStore';
import useUserStore from '@/stores/userStore';
import Message from '@/type';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import CommonButton from '../CommonButton';
import ChatAcceptModal from './ChatAcceptModal';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatRentalModal from './ChatRentalModal';


interface ChatProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

const ChatComponent = ({ sendMessage, messages }: ChatProps) => {
  const [rentalModalOpen, setRentalModalOpen] = useState<boolean>(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useUserStore()
  // const ac = Cookies.get('ac')
  const { chatRoomId } = useChatRoomStore()

  useEffect(() => {
    fetchChatMessages()
  }, [chatRoomId])

  const fetchChatMessages = async () => {
    try {
      const response = await instance.get(chatRequests.chat + `${chatRoomId}/`);
      setChatMessages(response.data.messages);
      console.log("채팅 메시지:", response.data.messages);
    } catch (error) {
      console.error('채팅 메시지 불러오기 에러', error);
    }
  }

  // const fetchUserData = async () => {
  //   try {
  //     const response = await instance.get(authRequests.userInfo)
  //     setUser(response.data)
  //     console.log("chatBubble에서 불러오는 회원정보", response)
  //   } catch (error) {
  //     console.error('회원정보 불러오기 에러', error)
  //   }
  // }

  console.log("실시간 채팅", messages)

  // 대화 상대방의 닉네임 가져오기
  const getPartnerNickname = () => {
    if (chatMessages.length > 0) {
      // 대화 상대방의 닉네임을 가져오는 함수
      const myNickname = user?.nickname;
      const partnerNickname = chatMessages.find(message => message.nickname !== myNickname)?.nickname;
      return partnerNickname || ""; // 상대방 닉네임이 없으면 빈 문자열 반환
    }
    return "";
  };


  // 컴포넌트가 마운트되거나 채팅 메시지가 업데이트될 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    // 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, messages]);

  return (
    <>
      {chatRoomId ? (


        <>
          {/* 대여신청하기, 수락하기 어떤 버튼 눌렀느냐에 따라서 다른 모달 보여주기 */}
          {rentalModalOpen ? (
            <ChatRentalModal setRentalModalOpen={setRentalModalOpen} />
          ) : (
            acceptModalOpen && <ChatAcceptModal setAcceptModalOpen={setAcceptModalOpen} />
          )}
          <div className="flex flex-col justify-center items-center pl-10 relative w-full md:pl-5 sm:pl-5  ">
            <div className="flex w-full flex-col justify-between h-screen overflow-y-scroll scrollbar-hide ">
              <div className="flex flex-col">
                {/* 사용자 정보 */}
                <div className={`sm:hidden ${userResCss}`}>
                  <div className="w-10 aspect-[1/1] mr-2 border-mainBlack rounded-full border ">
                    <img
                      src="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
                      className="w-full h-full object-cover rounded-full"
                      alt="프로필 이미지"
                    />
                  </div>
                  <div className="text-2xl my-3">{getPartnerNickname()}</div>
                </div>
                <div className="flex justify-between items-center">
                  {/* 상품정보 */}
                  {/* {productsDetails.map(item => (
                    <div className="flex flex-row justify-left items-center h-16 my-3" key={item.id}> */}
                  {/* 상품이미지 */}
                  {/* <div className=" h-20 w-20 border-mainBlack flex justify-center items-center overflow-hidden">
                        <img src={item.image} alt="상품이미지 " className="object-cover w-20 " />
                      </div> */}
                  {/* 상품상세정보 */}
                  {/* <div className="flex flex-col justify-center w-1/3 ml-3 h-14 sm:w-full md:w-full">
                        <p className="text-sm font-semibold">{item.title}</p>

                        <p className=" text-xs font-base text-subGray">
                          {item.description.length > 40 ? `${item.description.substring(0, 40)}...` : item.description}
                        </p>
                        <p className="text-sm">대여비 {item.price}</p>
                      </div>
                    </div>
                  ))} */}
                  <div>
                    <CommonButton
                      className="bg-mainBlack text-mainWhite w-32 h-9 flex text-sm justify-center items-center mb-2 rounded-md p-1 sm:w-24 cursor-pointer "
                      onClick={() => setRentalModalOpen(true)}
                    >
                      대여 신청하기
                    </CommonButton>
                    <CommonButton
                      className="bg-[#D3D3D3] text-subGray  w-32 h-9 flex text-sm justify-center items-center rounded-md p-1 sm:w-24 cursor-pointer 
              "
                      onClick={() => setAcceptModalOpen(true)}
                    >
                      수락하기
                    </CommonButton>
                  </div>
                </div>
              </div>
              {/* 날짜 수평선 */}
              <div className="flex items-center justify-center space-x-2  ">
                <div className="flex-1 border-b  border-hrGray"></div>
                <div className="text-subGray text-[11px]  px-2">2024.05.09</div>
                <div className="flex-1 border-b border-hrGray"></div>
              </div>
              {/* 채팅창 */}
              <div className="flex flex-col flex-grow overflow-y-scroll scrollbar-hide pb-3" ref={chatContainerRef}>
                <div className="flex flex-col justify-between mt-4">
                  {chatMessages.length > 0 && (
                    chatMessages.map((data) => (
                      <ChatBubble
                        key={data.id}
                        content={data.text}
                        time={data.timestamp}
                        subject={data.nickname}
                        img={data.image || ''}
                        profile_img={`https://i.pinimg.com/564x/9d/d4/52/9dd45271b020a094a12bfeee12b39f65.jpg`}
                        read={data.status}
                      />
                    )))}

                  {messages.map((data, index) => (
                    <ChatBubble
                      key={index}
                      content={data.message}
                      time={data.timestamp}
                      subject={data.nickname}
                      img={data.image_url}
                      profile_img={`https://i.pinimg.com/564x/9d/d4/52/9dd45271b020a094a12bfeee12b39f65.jpg`}
                      read={data.status}
                    />
                  ))}
                </div>
              </div>
              {/* 입력창 */}
              <ChatInput sendMessage={sendMessage} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center pl-10 relative w-full  ">현재 접속 중인 채팅방이 없습니다.</div>
      )}

    </>
  );
};

const userResCss = 'flex justify-center items-center flex-row ';
export default ChatComponent;
