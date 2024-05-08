"use client";
import products from "@/productData";
import { Dispatch, SetStateAction, useRef } from "react";
interface ProductsProps {
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const Products = ({ setDetailModalOpen }: ProductsProps) => {
  const wishIconRef = useRef<SVGSVGElement>(null);
  const handleOpenStyleModal = () => {
    setDetailModalOpen(true);
  };

  return (
    <>
      {/* 8개 상품 컨테이너*/}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10"
        onClick={handleOpenStyleModal}
      >
        {/* 각각의 상품 하나하나 */}
        {products.map((product) => (
          <div key={product.id} className="flex flex-col hover:cursor-pointer">
            <img src={product.image} className="aspect-[3/3.5] relative mb-2" />
            <div className="flex justify-between">
              <p className="font-bold text-base">{product.title}</p>
              {/* 엑스버튼  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
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
