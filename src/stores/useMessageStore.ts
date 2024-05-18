// stores/useMessageStore.js
import { create } from 'zustand';

interface MessageDto {
  image: string;
  message: string;
  nickname: string;
  status: boolean;
  timestamp: string;
  chatroom: string; // chatRoomId 추가
}

interface ChatListMessage {
  messages: MessageDto[];
  setMessages: (messages: MessageDto[]) => void;
  addMessage: (message: MessageDto) => void;
}

const useMessageStore = create<ChatListMessage>((set, get) => ({
  messages: [],
  setMessages: messages => set({ messages }),
  addMessage: message => {
    // 새 메시지가 이미 존재하는지 확인
    const isNewMessage = !get().messages.some(msg => msg.timestamp === message.timestamp);
    if (isNewMessage) {
      set(state => ({ messages: [...state.messages, message] }));
    }
  },
  getMessagesByChatRoomId: (chatRoomId: string) => {
    return get().messages.filter(message => message.chatroom === chatRoomId);
  },
}));

export default useMessageStore;
