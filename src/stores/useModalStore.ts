import { create } from 'zustand';

// const [selectedProductId, setSelectedProductId] = useState(0);
// 상품 아이디 저장하는 상태
interface ProductId {
  selectedProductId: number;
  willSelectedProductId: number | null;
  setSelectedProductId: (id: number) => void;
  setWillSelectedProductId: (id: number | null) => void;
}
export const useProductIdStore = create<ProductId>(set => ({
  selectedProductId: 0,
  willSelectedProductId: 0,
  setSelectedProductId: id => set({ selectedProductId: id }),
  setWillSelectedProductId: id => set({ willSelectedProductId: id }),
}));

// 모달 열고닫는 상태
// const [detailModalOpen, setDetailModalOpen] = useState(false);
interface ModalOpenStore {
  detailModalOpen: boolean;
  fromPath: string;
  setDetailModalOpen: (isOpen: boolean, path?: string) => void;
}

export const useModalOpenStore = create<ModalOpenStore>(set => ({
  detailModalOpen: false,
  fromPath: '', // 모달이 열릴 때의 경로를 저장할 상태
  setDetailModalOpen: (isOpen: boolean, path = '') => set({ detailModalOpen: isOpen, fromPath: path }),
}));
