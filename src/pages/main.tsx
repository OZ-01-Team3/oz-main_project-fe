import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import Products from '@/components/Products';
import StyleModal from '@/components/StyleModal';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect } from 'react';

const Main = () => {
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { setDetailModalOpen, detailModalOpen } = useModalOpenStore();

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true, window.location.pathname);
      console.log(window.location.pathname);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  return (
    <div>
      {detailModalOpen && <ProductDetailModal />}
      <StyleModal />
      <Banner />
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
        <p className="text-2xl mb-4">내가 선택한 스타일에 맞는 추천스타일</p>
        <Products />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <p className="text-2xl mb-4 font-didot">NEW</p>
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <EventBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
