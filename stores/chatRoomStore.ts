// chatRoomStore.js

import { create } from 'zustand';

const useChatRoomStore = create(set => ({
  chatRoomId: null,
  setChatRoomId: id => set({ chatRoomId: id }),
}));

export default useChatRoomStore;
