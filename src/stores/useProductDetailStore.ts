import { create } from 'zustand';

interface ImageDto {
  id: number;
  image: string;
}
interface ProductDetailDto {
  amount: number;
  brand: string;
  condition: string;
  created_at: string;
  description: string;
  images: ImageDto[];
  lender: {
    age: number;
    email: string;
    gender: string;
    height: string;
    nickname: string;
    phone: string;
    pk: number;
    profile_img: string;
    region: string;
  };
  likes: number;
  name: string;
  product_category: number;
  purchase_price: number;
  region: string;
  rental_fee: number;
  size: string;
  status: boolean;
  updated_at: string;
  url: string;
  uuid: string;
  views: number;
}

interface ProductState {
  productDetail: ProductDetailDto | null;
  setProductDetail: (productDetail: ProductDetailDto) => void;
  clearProductDetail: () => void;
}

export const useProductDetailStore = create<ProductState>(set => ({
  productDetail: null,
  setProductDetail: productDetail => set({ productDetail }),
  clearProductDetail: () => set({ productDetail: null }),
}));
