import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import ProductDetailModal from '@/components/ProductDetail/ProductDetailModal';
import Products from '@/components/Products';
import StyleModal from '@/components/StyleModal';
import { useProductIdStore } from '@/stores/modalStore';
import { useEffect } from 'react';

const Main = () => {
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();

  useEffect(() => {
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  return (
    <div>
      <ProductDetailModal />
      <StyleModal />
      <Banner />
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
        <p className="text-2xl mb-4">내가 선택한 스타일에 맞는 추천스타일</p>
        <Products />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <p className="text-2xl mb-4 font-didot">NEW</p>
        <Products />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <EventBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
