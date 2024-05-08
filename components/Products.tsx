"use client";
import products from "@/productData";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import wish from "../public/images/wish.png";
interface ProductsProps {
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const Products = ({ setDetailModalOpen }: ProductsProps) => {
  return (
    <>
      {/* 8개 상품 컨테이너*/}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10"
        onClick={() => setDetailModalOpen(true)}
      >
        {/* 각각의 상품 하나하나 */}
        {products.map((product) => (
          <div key={product.id} className="flex flex-col hover:cursor-pointer">
            <img src={product.image} className="aspect-[3/3.5] relative mb-2" />
            <div className="flex justify-between">
              <p className="font-bold text-base">{product.title}</p>
              <Image src={wish} alt="하트아이콘" />
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
