import { create } from 'zustand';

interface Lender {
  age: number;
  email: string;
  gender: string;
  height: string;
  nickname: string;
  phone: string;
  pk: number;
  profile_img: string;
  region: string;
}

interface ProductState {
  lender: Lender | null;
  setLender: (lender: Lender) => void;
  clearLender: () => void;
}

export const useProductStore = create<ProductState>(set => ({
  lender: null,
  setLender: lender => set({ lender }),
  clearLender: () => set({ lender: null }),
}));
