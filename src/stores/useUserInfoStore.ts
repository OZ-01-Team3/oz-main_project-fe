import { create } from 'zustand';

interface UserInfoState {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const useUserInfoStore = create<UserInfoState>(set => ({
  nickname: '',
  setNickname: nickname => set({ nickname }),
}));

export default useUserInfoStore;
