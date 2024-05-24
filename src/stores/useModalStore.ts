import { create } from 'zustand';

// const [selectedProductId, setSelectedProductId] = useState(0);
// 상품 아이디 저장하는 상태
interface ProductId {
  selectedProductId: string | null;
  willSelectedProductId: string | undefined | null;
  setSelectedProductId: (id: string) => void;
  setWillSelectedProductId: (id: string | undefined | null) => void;
}
export const useProductIdStore = create<ProductId>(set => ({
  selectedProductId: null,
  willSelectedProductId: null,
  setSelectedProductId: id => set({ selectedProductId: id }),
  setWillSelectedProductId: id => set({ willSelectedProductId: id }),
}));

// 모달 열고닫는 상태
// const [detailModalOpen, setDetailModalOpen] = useState(false);
interface ModalOpenStore {
  detailModalOpen: boolean;
  setDetailModalOpen: (isOpen: boolean) => void;
}

export const useModalOpenStore = create<ModalOpenStore>(set => ({
  detailModalOpen: false, // 모달이 열릴 때의 경로를 저장할 상태
  setDetailModalOpen: (isOpen: boolean) => set({ detailModalOpen: isOpen }),
}));
