import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  logout: () => void;
}
const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: loggedIn => set({ isLoggedIn: loggedIn }),
  logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;
