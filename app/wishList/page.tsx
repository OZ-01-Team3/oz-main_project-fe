'use client';
import Footer from '@/components/Footer';
import ProductDetailModal from '@/components/ProductDetail/ProductDetailModal';
import Products from '@/components/Products';
import { useState } from 'react';

const WishListPage = () => {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  return (
    <>
      <ProductDetailModal detailModalOpen={detailModalOpen} setDetailModalOpen={setDetailModalOpen} />
      <div className="pt-20 w-2/3 ml-auto mr-auto ">
        <h1 className="text-4xl mb-20 font-didot text-center">Wish List</h1>
        <Products setDetailModalOpen={setDetailModalOpen} />
      </div>
      <Footer />
    </>
  );
};

export default WishListPage;
