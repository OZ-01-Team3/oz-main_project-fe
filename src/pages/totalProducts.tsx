'use client';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import PageNation from '@/components/PageNation';
import Products from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect } from 'react';
const category = ['전체', '아우터', '상의', '하의', '잡화', '신발'];
const sort = ['전체', '대여많은순', '최신순', '가격낮은순', '가격높은순'];
const TotalProducts = () => {
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setSelectedProductId(willSelectedProductId);
      setDetailModalOpen(true, window.location.pathname);

      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      {/* 페이지 레이아웃 */}
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
        {/* 상품 카테고리 select박스 */}
        <select className="bg-transparent rounded-xl mr-5 ">
          {category.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        {/* 상품 정렬 select박스 */}
        <select className="bg-transparent rounded-xl ">
          {sort.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <h1 className="text-4xl mb-20 font-didot text-center">ALL</h1>
        <Products />
        <EventBanner />
        <Products />
        <Products />
        {/* 페이지네이션 */}
        <PageNation />
      </div>
      <Footer />
    </>
  );
};

export default TotalProducts;
