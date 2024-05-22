import { chatListAPI } from "@/api/chatRequests";
import useMessageStore from "@/stores/useMessageStore";
import { useQuery } from "@tanstack/react-query";
import { ErrorBoundary } from 'react-error-boundary';
import ChatLIst from "./ChatList";

interface ChatInfoDto {
  id: number;
  user_info: {
    nickname: string;
  };
  product: string;
  last_message: {
    chatroom: number;
    id: string;
    image: string;
    nickname: string;
    status: boolean;
    text: string;
    timestamp: string;
  };
  unread_chat_count: number;
}


const ChatLists = () => {
  const messages = useMessageStore((state) => state.messages);

  const { data: ChatList, isLoading: isChatListLoading, error: ChatListError } = useQuery<ChatInfoDto[], Error>({
    queryKey: ['chatList'],
    queryFn: async () => {
      try {
        const response = await chatListAPI();

        console.log("이거는 api에서내려오는 채팅리스트", response.data);
        return response.data;
      } catch (error) {
        throw new Error("채팅리스트 불러오기 에러");
      }
    }
  });

  console.log("채팅리스트에 메세진데 이거는 실시간", messages);

  if (isChatListLoading) return <div>Loading...</div>;
  if (ChatListError) return <div>Error: {ChatListError.message}</div>;

  return (
    <>
      {ChatList?.map((data) => (
        <ChatLIst
          key={data.id}
          id={data.id}
          chatId={data?.last_message?.chatroom || data.id}
          user={data.user_info.nickname}
          content={data?.last_message?.text || "보낸 메세지가 없습니다."}
          time={data?.last_message?.timestamp || new Date().toISOString()}
          product="https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg"
          profile="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
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
