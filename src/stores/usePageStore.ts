//! 페이지네이션 관련 스토어
import { create } from 'zustand';
// const [currentPage, setCurrentPage] = useState(1);
interface CurrentPageStore {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export const useCurrentPageStore = create<CurrentPageStore>(set => ({
  currentPage: 1,
  setCurrentPage: page => set({ currentPage: page }),
}));

// const [totalPages, setTotalPages] = useState(1);
interface TotalPageStore {
  totalPages: number;
  setTotalPages: (page: number) => void;
}
export const useTotalPageStore = create<TotalPageStore>(set => ({
  totalPages: 1,
  setTotalPages: page => set({ totalPages: page }),
}));
