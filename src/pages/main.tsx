import instance from '@/api/instance';
import { productRequests } from '@/api/productRequest';
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
  const navigate = useNavigate();
  const [products, setProducts] = useState<product[]>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const [styleProducts, setStyleProducts] = useState<product[]>([]);
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { setDetailModalOpen, detailModalOpen } = useModalOpenStore();
  const { isLoggedIn } = useAuthStore();

  const selectedStyle = localStorage.getItem('style');
  const selectedStyles = JSON.parse(selectedStyle);

  // 모달 라우팅 위한 useEffect
  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  // 스타일 태그 인덱스 값 바뀔 때 마다 새로 호출
  useEffect(() => {
    handleSelectCategory();
  }, [randomIndex]);
  // 마운트 됐을때 전체상품 가져오고, 인덱스 랜덤으로 돌리기
  useEffect(() => {
    fetchProducts();
    getRandomIndex();
  }, []);
  //  전체상품 불러오는 함수(최신8개 보여주기위해!)
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
  // 새로고침할때마다 사용자가 선택한 스타일 태그 중 하나 랜덤으로 도출
  const getRandomIndex = () => {
    const index = Math.floor(Math.random() * selectedStyles.length);
    setRandomIndex(index);
  };
  // 스타일 태그 별로 필터링 해서 상품 가져오는 함수
  const handleSelectCategory = async () => {
    try {
      if (isLoggedIn) {
        // 로그인되어있는사용자면,
        const response = await instance.get(`${productRequests.products}?styles=${selectedStyles[randomIndex]}`);
        setStyleProducts(response.data.results);
      } else {
        // 로그인 되어있지않은 사용자면,,
        const response = await axios.get(VITE_BASE_REQUEST_URL + `/products/?styles=${selectedStyles[randomIndex]}`);
        setStyleProducts(response.data.results);
      }
    } catch (error) {
      console.error('상품 불러오기 실패:', error);
    }
  };
  //최신상품 8개만 보여주는
  const newProducts = products.slice(0, 8);
  //스타일별 8개 보여주는
  const styleProduct = styleProducts.slice(0, 8);

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
        <Products products={styleProduct} setProducts={setProducts} />
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
