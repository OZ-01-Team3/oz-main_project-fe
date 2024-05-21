import { create } from 'zustand';

const useAuthStore = create(set => ({
  isLoggedIn: false,
  setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
