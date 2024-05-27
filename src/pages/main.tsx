import instance from '@/api/instance';
import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import Products, { product } from '@/components/Products';
import StyleModal from '@/components/StyleModal';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import useAuthStore from '@/stores/useAuthStore';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

const Main = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState<product[]>([]);
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { setDetailModalOpen, detailModalOpen } = useModalOpenStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (isLoggedIn) {
          // 로그인되어있는사용자면,
          const response = await instance.get(`/products/`);
          setProducts(response.data.results);
        } else {
          // 로그인 되어있지않은 사용자면,,
          const response = await axios.get(VITE_BASE_REQUEST_URL + `/products/`);
          setProducts(response.data.results);
        }
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    };
    fetchProducts();
  }, []);

  //최신상품 8개만 보여주는
  const newProducts = products.slice(0, 8);

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  return (
    <div>
      {detailModalOpen && <ProductDetailModal />}
      <StyleModal />
      <Banner />
      <div className="pt-32 w-2/3 ml-auto mr-auto  ">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl mb-4 w-4/6">내가 선택한 스타일에 맞는 추천스타일</p>
          <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate('/all')}>
            <p>전체상품</p>
            <ArrowRightIcon className="w-4 h-4 ml-3 " />
          </div>
        </div>
        <Products products={products} setProducts={setProducts} />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl mb-4 font-didot">NEW</p>
          <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate('/all')}>
            <p>전체상품</p>
            <ArrowRightIcon className="w-4 h-4 ml-3 " />
          </div>
        </div>

        <Products products={newProducts} setProducts={setProducts} />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <EventBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
