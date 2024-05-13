'use client';
import products from '@/productData';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useRef } from 'react';
interface ProductsProps {
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const Products = ({ setDetailModalOpen }: ProductsProps) => {
  const wishIconRef = useRef<SVGSVGElement>(null);
  const handleOpenStyleModal = () => {
    setDetailModalOpen(true);
    document.body.style.overflow = 'hidden';
  };


  return (
    <>
      {/* 8개 상품 컨테이너*/}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10"
        onClick={handleOpenStyleModal}
      >
        {/* 각각의 상품 하나하나 */}
        {products.map(product => (
          <div key={product.id} className="flex flex-col hover:cursor-pointer">
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
