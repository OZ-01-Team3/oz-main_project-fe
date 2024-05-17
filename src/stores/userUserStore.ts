// userStore.js

import { create } from 'zustand';

interface User {
  age?: number;
  email?: string;
  gender?: string;
  grade?: string;
  height?: string;
  nickname?: string;
  phone?: string;
  profile?: string;
  region?: string;
}
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>(set => ({
  user: null,
  setUser: user => set({ user }),
}));

export default useUserStore;
