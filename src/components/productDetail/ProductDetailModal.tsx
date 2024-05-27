import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useProductStore } from '@/stores/useProductDetailStore';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalPortal } from '../ModalPortal';
import { product } from '../Products';
import ModalStyleButton from './ModalStyleButton';
import ProductDetailResponse from './ProductDetailResponse';
import ProductDetailsDescription from './ProductDetailsDescription';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
const lender = {
  age: 24,
  email: 'test@gmail.com',
  nickname: '닉네임',
};
export const initialProduct: product = {
  uuid: 'uuid',
  brand: '',
  condition: '',
  description: '',
  purchase_date: '',
  purchase_price: 0,
  name: '',
  rental_fee: 0,
  size: '',
  views: 0,
  product_category: 0,
  amount: 0,
  region: '',
  images: [],
  isFavorite: false,
  lender: lender,
};

const style = ['#모던', '#페미닌', '#가디건'];

// 상품클릭 시 나오는 모달
const ProductDetailModal = () => {
  const { productId } = useParams(); // url에서 productId받아오기
  console.log('useParamsProductId', productId);

  const navigate = useNavigate();
  const { setDetailModalOpen } = useModalOpenStore();
  const { selectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { setLender } = useProductStore();
  const [productDetails, setProductDetails] = useState<product>(initialProduct);
  const prevPath = localStorage.getItem('pathname');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % productDetails.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + productDetails.images.length) % productDetails.images.length);
  };
  console.log(currentImageIndex);

  //  아이템을 선택해서 모달이 띄워지는게 아니라, 새로고침시 띄워질 경우,
  //  현재 경로에 따라서 all 이면 all 로 돌아오고 메인이면 메인으로 돌아가도록
  //  새로고침하면 fromPath 상태 다 날아감.. => localStorage 에 저장!
  useEffect(() => {
    console.log('uuid', selectedProductId);
    console.log('prevPath', prevPath);
    if (!selectedProductId) {
      setWillSelectedProductId(productId);
      console.log(productId);
      setDetailModalOpen(true);

      if (prevPath === '/') {
        navigate('/', { replace: true });
      }
      if (prevPath === '/all') {
        navigate('/all', { replace: true });
      }
      if (prevPath === '/search') {
        navigate('/search', { replace: true });
      } else {
        navigate('/all', { replace: true });
      }
    }
  }, [productId, selectedProductId, setDetailModalOpen, setWillSelectedProductId]);

  // selectedProductId 바뀔때마다 fetchProductDetail 바꿔주기
  useEffect(() => {
    fetchProductDetail(selectedProductId);
  }, [selectedProductId]);
  // fetchProductDetail id에 맞는 정보 불러오기
  const fetchProductDetail = async (selectedProductId: string | null) => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/products/${selectedProductId}/`);
      // console.log(response.data);
      setProductDetails(response.data);
      setLender(response.data.lender);
      setCurrentImageIndex(0);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setDetailModalOpen(false);
    if (prevPath === '/') {
      navigate('/', { replace: true });
    }
    if (prevPath === '/all') {
      navigate('/all', { replace: true });
    }
    if (prevPath === '/search') {
      navigate('/search', { replace: true });
    } else {
      navigate('/all', { replace: true });
    }
  };

  return (
    <>
      {productDetails && (
        <ModalPortal>
          <div
            className="flex w-full h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center"
            ref={outerBoxRef}
            onClick={e => {
              if (e.target === outerBoxRef.current) {
                handleCloseModal();
              }
            }}
          >
            <ProductDetailResponse productDetails={productDetails} />
            {/* 모달 컨텐츠 */}
            <div className="flex flex-row justify-center pl-10 pr-10 bg-mainWhite h-[565.5px] w-[950px] lg:w-[730px] md:w-[620px] sm:w-full sm:h-full sm:flex-col pt-10 pb-5 rounded-lg relative lg:h-[500px] md:h-[400px] sm:overflow-y-scroll sm:justify-start sm:items-center sm:hidden md:hidden">
              {/* 닫기 버튼 */}
              <XMarkIcon
                className="w-6 h-6 text-mainBlack absolute right-5 top-5 cursor-pointer"
                onClick={handleCloseModal}
              />
              {/* 사진 영역 */}
              <div className="w-1/2 pr-10 flex flex-col  relative justify-between">
                <ChevronLeftIcon
                  onClick={handlePrevImage}
                  className="absolute w-7 h-7 -left-6 top-48 text-mainBlack cursor-pointer"
                />
                <ChevronRightIcon
                  onClick={handleNextImage}
                  className="absolute  w-7 h-7 right-4 top-48 text-mainBlack cursor-pointer"
                />

                <div className="w-full h-[410px] lg:h-[360px] overscroll-x-none flex">
                  {productDetails.images.length > 0 && (
                    <img
                      src={productDetails.images[currentImageIndex].image}
                      className="w-full h-full  lg:h-[360px]  object-cover "
                      alt="상품 이미지"
                    />
                  )}
                </div>
                <div className="flex flex-row justify-between text-mainBlack lg:my-2  pl-2 pr-2">
                  <div className="text-xl lg:text-lg font-semibold">대여비</div>
                  <div className="text-lg lg:text-base">{productDetails.rental_fee.toLocaleString()}(1일)</div>
                </div>
                <div className="px-2 flex justify-start">
                  {/* 스타일 버튼들 */}
                  {style.map(product => (
                    <ModalStyleButton key={product}>{product}</ModalStyleButton>
                  ))}
                </div>
              </div>
              {/* 상세 설명 영역 */}
              <ProductDetailsDescription productDetails={productDetails} />
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
};

export default ProductDetailModal;
