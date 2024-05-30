import { create } from 'zustand';

interface RentalStore {
  borrwerId: number | null;
  setBorrwerId: (borrwerId: number) => void;
  productId: string;
  setProductId: (productId: string) => void;
}

const useRentalStore = create<RentalStore>(set => ({
  borrwerId: 0,
  productId: '',
  setBorrwerId: borrwerId => set({ borrwerId: borrwerId }),
  setProductId: productuuid => set({ productId: productuuid }),
}));

export default useRentalStore;
