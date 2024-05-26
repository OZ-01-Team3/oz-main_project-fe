import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';

import { useEffect } from 'react';

interface image {
  id: number;
  image: string;
}
export interface product {
  uuid: string;
  brand: string;
  condition: string;
  description: string;
  purchase_date: string;
  purchase_price: number;
  name: string;
  rental_fee: number;
  size: string;
  views: 0;
  product_category: number;
  amount: number;
  region: string;
  images: image[];
  isFavorite: boolean;
  lender: lender;
}
interface lender {
  age?: number;
  email: string;
  nickname: string;
}
export interface ProductProps {
  products: product[];
  setProducts: (products: product[]) => void;
}

const Products = ({ products, setProducts }: ProductProps) => {
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  useEffect(() => {
    if (detailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [detailModalOpen]);
  const { setSelectedProductId } = useProductIdStore();

  // 아이디 받아서 일치하면 isFavorite 바꿔주기
  const toggleFavorite = (id: string) => {
    // products 받아서 맵 돌리고 선택한 아이디랑 같으면 isFavorite의 값 토글해주기
    setProducts(currentProducts =>
      currentProducts.map(product => (product.uuid === id ? { ...product, isFavorite: !product.isFavorite } : product))
    );
  };

  const handleOpenModal = (id: string) => {
    setDetailModalOpen(true);
    setSelectedProductId(id);
    history.pushState({}, '', `/product/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10 ">
        {products.map(product => (
          <div
            key={product.uuid}
            className="flex flex-col hover:cursor-pointer"
            onClick={() => handleOpenModal(product.uuid)}
          >
            {product.images.length > 0 && (
              <div className="aspect-[3/3.5] bg-red-200 relative mb-2 ">
                <img src={product.images[0].image} className="w-full h-full object-cover  aspect-[3/3.5]" />
              </div>
            )}

            <div className="flex justify-between">
              <p className="font-bold text-base w-5/6">{product.name}</p>
              {product.isFavorite ? (
                <FilledHeartIcon
                  className="w-6 h-6 text-red-500 hover:scale-110"
                  onClick={event => {
                    event.stopPropagation();
                    toggleFavorite(product.uuid);
                  }}
                />
              ) : (
                <OutlineHeartIcon
                  className="w-6 h-6 hover:scale-110"
                  onClick={event => {
                    event.stopPropagation();
                    toggleFavorite(product.uuid);
                  }}
                />
              )}
            </div>
            <p className="text-sm font-thin mt-1">
              {product.description.length > 39 ? `${product.description.substring(0, 39)}...` : product.description}
            </p>
            <p className="text-sm mt-1">{product.rental_fee.toLocaleString()}원 </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
