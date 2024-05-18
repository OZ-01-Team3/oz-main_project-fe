// stores/useMessageStore.js
import { create } from 'zustand';

interface Message {
  imgUrl: string;
  message: string;
  nickname: string;
  status: boolean;
  timestamp: string;
}

interface ChatListMessage {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const useMessageStore = create<ChatListMessage>(set => ({
  messages: [],
  addMessage: message => set(state => ({ messages: [...state.messages, message] })),
}));

export default useMessageStore;
