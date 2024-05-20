import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

import { FileType } from '@/pages/imgRegistration';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'; //빨간하트
import axios from 'axios';
export interface product {
  id: number;
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
  images: FileType[];
  isFavorite: boolean;
}

const Products = () => {
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  useEffect(() => {
    if (detailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [detailModalOpen]);
  const { setSelectedProductId } = useProductIdStore();
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/v1/products');
        // const response = await instance.get(productRequests.products);
        console.log(response.data);
        const updatedProducts = response.data.items.map((item: product) => ({
          ...item, // 불변성관리 위해 item 복사해서 isFavorite:false 속성추가해준것!
          isFavorite: false,
        }));
        setProducts(updatedProducts); // isFavorite 상태 있는 것을 products로 사용하기 위해 해줌
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    };
    fetchProducts();
  }, []);

  // 아이디 받아서 일치하면 isFavorite 바꿔주기
  const toggleFavorite = (id: number) => {
    // products 받아서 맵 돌리고 선택한 아이디랑 같으면 isFavorite의 값 토글해주기
    setProducts(currentProducts =>
      currentProducts.map(product => (product.id === id ? { ...product, isFavorite: !product.isFavorite } : product))
    );
  };

  const handleOpenModal = (id: number) => {
    setDetailModalOpen(true);
    setSelectedProductId(id);
    history.pushState({}, '', `/product/${id}`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10">
        {products.map(product => (
          <div
            key={product.id}
            className="flex flex-col hover:cursor-pointer"
            onClick={() => handleOpenModal(product.id)}
          >
            <img src={product.image} className="aspect-[3/3.5] relative mb-2" />
            {/* {product.images.map(item => (
              <img src={item.imageUrl} className="aspect-[3/3.5] relative mb-2" />
            ))} */}

            <div className="flex justify-between">
              <p className="font-bold text-base">{product.title}</p>
              {product.isFavorite ? (
                <FilledHeartIcon
                  className="w-6 h-6 text-red-500 hover:scale-110"
                  onClick={event => {
                    event.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                />
              ) : (
                <OutlineHeartIcon
                  className="w-6 h-6 hover:scale-110"
                  onClick={event => {
                    event.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                />
              )}
            </div>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">{product.rental_fee}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
