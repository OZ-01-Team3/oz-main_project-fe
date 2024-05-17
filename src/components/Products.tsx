import { useModalOpenStore, useProductIdStore } from '@/stores/modalStore';
import { HeartIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
interface product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
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
        console.log(response.data); // 받은 데이터를 로그로 출력
        setProducts(response.data.items); // 받은 데이터의 items 배열을 상품 목록으로 설정
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    };
    fetchProducts(); // 컴포넌트가 마운트된 후에 상품 데이터를 가져오는 함수 호출
  }, []);

  const handleOpenModal = (id: number) => {
    setDetailModalOpen(true);
    setSelectedProductId(id);
    history.pushState({}, '', `/product/${id}`);
  };

  return (
    <>
      {/* 8개 상품 컨테이너*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10">
        {/* 각각의 상품 하나하나 */}
        {products.map(product => (
          <div
            key={product.id}
            className="flex flex-col hover:cursor-pointer"
            onClick={() => handleOpenModal(product.id)}
          >
            <img src={product.image} className="aspect-[3/3.5] relative mb-2" />
            <div className="flex justify-between">
              <p className="font-bold text-base">{product.title}</p>
              <HeartIcon className="w-6 h-6" />
            </div>
            <p className="text-sm">{product.description}</p>
            <p className="text-sm">{product.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};


export default Products;
