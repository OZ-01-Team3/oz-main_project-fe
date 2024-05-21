import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

import instance from '@/api/instance';
import { productRequests } from '@/api/productRequest';
import { useCurrentPageStore, useTotalPageStore } from '@/stores/usePageStore';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid'; //빨간하트

interface image {
  id: number;
  image: string;
}
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
  images: image[];
  isFavorite: boolean;
}

const Products = () => {
  const { currentPage } = useCurrentPageStore();
  const { setTotalPages } = useTotalPageStore();
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
    const fetchProducts = async (page: number) => {
      try {
        const response = await instance.get(`${productRequests.products}?page=${page}`);
        console.log(response.data);
        console.log(page);
        const updatedProducts = response.data.results.map((item: product) => ({
          ...item,
          isFavorite: false,
        }));
        setProducts(updatedProducts);
        const totalProducts = response.data.count;
        setTotalPages(Math.ceil(totalProducts / 24));
        console.log(Math.ceil(totalProducts / 24));
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    };
    fetchProducts(currentPage);
  }, [currentPage]);

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
            {product.images.length > 0 && (
              <img src={product.images[0].image} className="aspect-[3/3.5] relative mb-2" />
            )}
            <div className="flex justify-between">
              <p className="font-bold text-base">{product.name}</p>
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
