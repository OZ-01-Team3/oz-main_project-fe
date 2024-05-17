// chatRoomStore.js

import { create } from 'zustand';

interface ChatRoomState {
  chatRoomId: number | null;
  setChatRoomId: (id: number) => void;
}

const useChatRoomStore = create<ChatRoomState>(set => ({
  chatRoomId: null,
  setChatRoomId: id => set({ chatRoomId: id }),
}));

export default useChatRoomStore;
