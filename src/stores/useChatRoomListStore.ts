import { create } from 'zustand';

interface ChatListDto {
  id: number;
  last_message: {
    chatroom: number;
    created_at: string;
    id: number;
    image: string;
    nickname: string;
    status: boolean;
    text: string;
    updated_at: string;
  };
  product: string;
  product_image: string;
  unread_chat_count: number;
  user_info: {
    nickname: string;
  };
}
interface ChatListState {
  chatRoomList: ChatListDto[];
  setChatRoomList: (ChatList: ChatListDto[]) => void;
}

const useChatRoomListStore = create<ChatListState>(set => ({
  chatRoomList: [],
  setChatRoomList: chatRoomList => set({ chatRoomList }),
}));

export default useChatRoomListStore;
