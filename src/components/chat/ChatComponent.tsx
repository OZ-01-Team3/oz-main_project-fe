import chatRequests from '@/api/chatRequests';
import instance from '@/api/instance';
import useChatRoomStore from '@/stores/useChatRoomStore';
import useMessageStore from '@/stores/useMessageStore';
// import useUserInfoStore from '@/stores/useUserInfoStore';
import { productDetailListAPI } from '@/api/productRequest';
import useChatRoomListStore from '@/stores/useChatRoomListStore';
import Message from '@/type';
import { EllipsisVerticalIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import CommonButton from '../CommonButton';
import ChatAcceptModal from './ChatAcceptModal';
import ChatBubble from './ChatBubble';
import ChatDeleteModal from './ChatDeleteModal';
import ChatInput from './ChatInput';
import ChatRentalModal from './ChatRentalModal';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
interface ChatProps {
  messages: Message[];
  sendMessage: (message: string) => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  webSocketRef: React.MutableRefObject<ChatSocket | null>;
}

const ChatComponent = ({ sendMessage, webSocketRef }: ChatProps) => {
  const [rentalModalOpen, setRentalModalOpen] = useState<boolean>(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [matchingProduct, setMatchingProduct] = useState(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const { chatRoomId } = useChatRoomStore();
  const { chatRoomList } = useChatRoomListStore();
  const messages = useMessageStore(state => state.messages.filter(message => message.chatroom_id === chatRoomId));

  const cookies = new Cookies();
  const csrfToken = cookies.get('csrftoken');

  const queryClient = useQueryClient();

  const {
    data: chatData,
    isLoading: isChatMessageLoading,
    error: chatMessageError,
  } = useQuery({
    queryKey: ['chatMessage', chatRoomId],
    queryFn: async () => {
      if (!chatRoomId) {
        throw new Error('채팅방이 없습니다.');
      }
      const response = await instance.get(`${chatRequests.chat}${chatRoomId}/`);
      // console.log('여기가 api로 진짜 이전메세지들 내려줍디ㅏ.', response.data.messages)
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
      return response.data;
    },
    enabled: !!chatRoomId,
  });

  const chatMessages = chatData?.messages;
  const chatRoomInfo = chatData;

  const {
    data: productDetails,
    isLoading: isProductDetailsLoading,
    error: productDetailsError,
  } = useQuery({
    queryKey: ['productDetail'],
    queryFn: async () => {
      try {
        const response = await productDetailListAPI();
        return response.data.results;
      } catch (error) {
        throw new Error('상품 디테일 조회 에러');
      }
    },
  });

  // 컴포넌트가 마운트되거나 채팅 메시지가 업데이트될 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    // 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, messages]);

  // 드롭다운 메뉴 표시 상태를 토글하는 함수
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDeleteChatRoom = useMutation({
    mutationFn: (chatRoomId: number) =>
      instance.delete(VITE_BASE_REQUEST_URL + chatRequests.chat + chatRoomId + `/`, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }),
    onSuccess: () => {
      console.log('삭제성공');
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
      window.location.reload(); // 페이지 전체를 새로 고침
    },
    onError: error => {
      if (axios.isAxiosError(error)) {
        console.error('Axios 에러 응답 데이터:', error.response?.data);
        console.error('Axios 에러 응답 상태:', error.response?.status);
      } else {
        console.error('일반 에러:', error);
      }
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨', chatRoomId);
    },
  });

  const deleteChatRoom = () => {
    if (chatRoomId) {
      webSocketRef.current?.close(); //채팅방 종료
      handleDeleteChatRoom.mutate(chatRoomId);
    }
  };
  console.log('chatRoomInfo:', chatRoomInfo);
  // console.log("productDetails:", productDetails);

  // chatRoomInfo의 product 값과 productDetails 배열의 uuid 값이 일치하는 객체 찾기
  useEffect(() => {
    if (chatRoomInfo && productDetails) {
      const foundProduct = productDetails.find(product => product.uuid === chatRoomInfo.product);
      setMatchingProduct(foundProduct); // 일치하는 제품을 찾으면 상태 업데이트
    } else {
      setMatchingProduct(null); // 유효하지 않은 경우 null로 설정
    }
  }, [chatRoomInfo, productDetails]); // chatRoomInfo 또는 productDetails가 변경될 때마다 실행

  console.log('채팅 메세지', chatMessages);

  if (isChatMessageLoading) return <div>Loading...</div>;
  if (chatMessageError) return <div>Error: {chatMessageError.message}</div>;
  if (!chatRoomId || (chatMessages && chatMessages.length === 0))
    return (
      <div className="flex flex-col justify-center items-center pl-10 relative w-full  ">
        접속중인 채팅방이 없습니다.
      </div>
    );

  if (isProductDetailsLoading) return <div>Loading...</div>;
  if (productDetailsError) return <div>{productDetailsError.message}</div>;

  return (
    <>
      {deleteModalOpen && <ChatDeleteModal setOpen={setDeleteModalOpen} deleteChatRoom={deleteChatRoom} />}
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
            <div className={`sm:hidden ${userResCss} relative`}>
              <div className="flex items-center mx-auto">
                <div className="w-10 aspect-[1/1] mr-2 border-mainBlack rounded-full border ">
                  {matchingProduct && matchingProduct.lender && matchingProduct.lender.profile_img ? (
                    <img
                      src={matchingProduct.lender.profile_img}
                      className="w-full h-full object-cover rounded-full"
                      alt="프로필 이미지"
                    />
                  ) : (
                    <UserCircleIcon className="w-full h-full object-cover rounded-full" />
                  )}
                </div>
                {chatRoomList.map((item, index) => {
                  // 현재 순회 중인 채팅방의 id와 chatRoomId가 일치하는 경우에만 닉네임 출력
                  if (item.id === chatRoomId) {
                    return (
                      <div className="text-2xl my-3" key={index}>
                        {item.user_info.nickname}
                      </div>
                    );
                  }
                  // 일치하지 않는 경우 빈 요소 반환
                  return null;
                })}
              </div>
              <div className="absolute right-0">
                <button onClick={toggleDropdown}>
                  <EllipsisVerticalIcon className="w-4" />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                    <CommonButton
                      className="block px-4 py-2 text-sm text-gray-700"
                      onClick={() => setDeleteModalOpen(true)}
                    >
                      채팅방 나가기
                    </CommonButton>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              {/* 상품정보 */}

              <div className="flex flex-row justify-left items-center h-16 my-3">
                {/* 상품이미지 */}
                <div className=" h-20 w-20 border-mainBlack flex justify-center items-center overflow-hidden">
                  <img src={matchingProduct?.images[0].image} alt="상품이미지" className="object-cover w-20" />
                </div>
                {/* 상품상세정보 */}
                <div className="flex flex-col justify-center w-2/3 ml-3 h-14 sm:w-full md:w-full">
                  <p className="text-sm font-semibold">{matchingProduct?.name}</p>

                  <p className=" text-xs font-base text-subGray">
                    {matchingProduct?.description?.length > 40
                      ? `${matchingProduct?.description?.substring(0, 40)}...`
                      : matchingProduct?.description}
                  </p>
                  <p className="text-sm">대여비 {matchingProduct?.purchase_price.toLocaleString()}</p>
                </div>
              </div>
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
              {chatMessages?.length > 0 &&
                chatMessages.map(data => (
                  <ChatBubble
                    key={data.id}
                    content={data.text}
                    time={data.created_at}
                    subject={data.nickname}
                    img={data.image}
                    profile_img={`https://i.pinimg.com/564x/9d/d4/52/9dd45271b020a094a12bfeee12b39f65.jpg`}
                    read={data.status}
                  />
                ))}

              {messages.map((data, index) => (
                <ChatBubble
                  key={index}
                  content={data.text}
                  time={data.created_at}
                  subject={data.nickname}
                  img={data.image}
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
  );
};

const userResCss = 'flex justify-center items-center flex-row ';
export default ChatComponent;
