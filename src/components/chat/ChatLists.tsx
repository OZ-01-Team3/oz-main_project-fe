
import { chatListAPI } from "@/api/chatRequests";
// import Cookies from 'js-cookie';
import useMessageStore from "@/stores/useMessageStore";
import { useQuery } from "@tanstack/react-query";
import ChatLIst from './ChatList';

interface ChatInfo {
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
}


const ChatLists = () => {
  const messages = useMessageStore((state => state.messages))

  // useEffect(() => {
  //   const fetchChatListData = async () => {
  //     try {
  //       const response = await instance.get<ChatInfo[]>(chatRequests.chat)
  //       console.log("채팅방 리스트", response.data)
  //       setChatList(response.data)
  //     } catch (error) {
  //       console.error('채팅방 리스트 불러오기 에러', error)
  //     }
  //   }
  //   fetchChatListData()
  // }, [])

  const { data: ChatList, isLoading: isChatListLoading, error: ChatListError } = useQuery<ChatInfo[], Error>({
    queryKey: ['chatList'],
    queryFn: async () => {
      try {
        const response = await chatListAPI();
        console.log("갖고와", response.data)
        return response.data

      } catch (error) {
        throw Error("채팅리스트 불러오기 에러")
      }
    }
  })

  console.log("채팅리스트에 메세지", messages)



  if (isChatListLoading) return <div>Loading...</div>
  if (ChatListError) return <div>error</div>


  return (
    <>
      {ChatList?.map((data) => (
        <ChatLIst
          key={data?.id}
          id={data?.id}
          chatId={data?.last_message.chatroom}
          user={data.user_info?.nickname}
          content={data.last_message?.text}
          time={data.last_message?.timestamp}
          product="https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg"
          profile="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
          notification="2"
        />
      ))}
    </>
  );
};

export default ChatLists;
