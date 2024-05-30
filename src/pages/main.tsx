import { UserContext } from '@/App';
import instance from '@/api/instance';
import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import Products from '@/components/Products';
import StyleModal from '@/components/StyleModal';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

const Main = () => {
  const navigate = useNavigate();
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { setDetailModalOpen, detailModalOpen, setStyleModalOpen, styleModalOpen } = useModalOpenStore();
  const { isLoggedIn } = useContext(UserContext);
  useEffect(() => {}, [isLoggedIn]);
  let selectedStyle = [];
  try {
    selectedStyle = JSON.parse(String(localStorage.getItem('style')));
    if (selectedStyle === null) {
      console.log('로컬에 style 없음');
      selectedStyle = [];
    }
  } catch (error) {
    console.log(error);
  }
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
  useEffect(() => {
    if (isLoggedIn) {
      const style = localStorage.getItem('style');
      const firstLogin = localStorage.getItem('firstLogin');
      if (isLoggedIn && (!firstLogin || !style)) {
        setStyleModalOpen(true);
        localStorage.setItem('firstLogin', 'true');
      }
    }
  }, [isLoggedIn]);
  //상품 불러오기
  const {
    data: products,
    refetch,
    // isLoading: productsLoading,
    // error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        if (isLoggedIn) {
          // 로그인되어있는사용자면,
          const response = await instance.get(`/products/`);
          return response.data.results;
        } else {
          // 로그인 되어있지않은 사용자면,,
          const response = await axios.get(VITE_BASE_REQUEST_URL + `/products/`);
          return response.data.results;
        }
      } catch (error) {
        console.error('상품 불러오기 에러', error);
        throw error;
      }
    },
  });

  // useEffect(() => {
  //   if (isLoggedIn !== undefined && selectedStyle !== undefined) {
  //     refetch();
  //   }
  // }, [isLoggedIn, refetch, selectedStyle]);

  const filterStyles = (styles: string[]) => {
    return products && products.filter(product => styles.some(style => product.styles.includes(style)));
  };

  // 스타일별 필터링된 제품 설정
  const filteredProducts = filterStyles(selectedStyle);

  //최신상품 8개만 보여주는
  const newProducts = products && products.slice(0, 8);
  //스타일별 8개 보여주는
  const styleProduct = filteredProducts && filteredProducts.slice(0, 8);

  return (
    <div>
      {detailModalOpen && <ProductDetailModal />}
      {styleModalOpen && <StyleModal />}
      <Banner />
      <div className="pt-32 w-2/3 ml-auto mr-auto  ">
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl mb-4 w-4/6">내가 선택한 스타일에 맞는 추천스타일</p>
          <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate('/all')}>
            <p>전체상품</p>
            <ArrowRightIcon className="w-4 h-4 ml-3 " />
          </div>
        </div>
        <Products products={styleProduct} />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <div className="flex w-full items-center justify-between">
          <p className="text-2xl mb-4 font-didot">NEW</p>
          <div className="flex justify-center items-center cursor-pointer " onClick={() => navigate('/all')}>
            <p>전체상품</p>
            <ArrowRightIcon className="w-4 h-4 ml-3 " />
          </div>
        </div>

        <Products products={newProducts} />
        <hr className=" w-3/4 ml-auto mr-auto mt-10 mb-20 text-mainWhite " />
        <EventBanner />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
