import { chatListAPI } from '@/api/chatRequests';
import useChatRoomListStore from '@/stores/useChatRoomListStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../Loading';
import ChatLIst from './ChatList';

interface ChatInfoDto {
  id: number;
  user_info: {
    nickname: string;
    profile_img: string;
  };
  product: string;
  product_image: string;
  last_message: {
    chatroom: number;
    id: string;
    image: string;
    nickname: string;
    status: boolean;
    text: string;
    created_at: string;
  };
  unread_chat_count: number;
}

const ChatLists = () => {


  const setChatRoomList = useChatRoomListStore(state => state.setChatRoomList);
  const queryClient = useQueryClient();
  const {
    data: ChatList,
    isLoading: isChatListLoading,
    error: ChatListError,
  } = useQuery<ChatInfoDto[], Error>({
    queryKey: ['chatList'],
    queryFn: async () => {
      try {
        const response = await chatListAPI();
        let chatList = response.data;
        console.log("최근메세지 확인용", response.data)
        chatList = chatList.sort((a, b) => {
          const dateA = new Date(a.last_message?.created_at || 0);
          const dateB = new Date(b.last_message?.created_at || 0);
          return dateB.getTime() - dateA.getTime();
        });

        setChatRoomList(chatList);
        // queryClient.invalidateQueries({ queryKey: ['chatList'] });
        return chatList;
      } catch (error) {
        if ((error as AxiosError).response && (error as AxiosError).response?.status === 404) {
          // 404 오류 처리
          throw new Error('참여중인 채팅방이 없습니다.');
        } else {
          // 다른 오류 처리
          throw new Error('채팅리스트를 불러오는데 실패했습니다.');
        }
      }
    },

  });


  // // console.log('채팅 리스트 ', ChatList);
  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['chatList'] });
  // }, [ChatList])

  if (isChatListLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (ChatListError) return <div>{ChatListError.message}</div>;
  if (!ChatList || ChatList.length === 0) {
    return <div>채팅이 없습니다</div>;
  }
  return (
    <>
      {ChatList?.map(data => (
        <ChatLIst
          key={data.id}
          id={data.id}
          chatId={data?.last_message?.chatroom || data.id}
          user={data.user_info.nickname}
          content={data?.last_message?.text || '보낸 메세지가 없습니다.'}
          time={data?.last_message?.created_at || new Date().toISOString()}
          product={data.product_image}
          profile={data.user_info.profile_img}
          notification={data.unread_chat_count}
        />
      ))}
    </>
  );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const ChatListsWithErrorBoundary = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ChatLists />
    </ErrorBoundary>
  );
};

export default ChatListsWithErrorBoundary;
