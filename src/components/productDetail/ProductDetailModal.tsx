import instance from '@/api/instance';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalPortal } from '../ModalPortal';
import { product } from '../Products';
import ModalStyleButton from './ModalStyleButton';
import ProductDetailResponse from './ProductDetailResponse';
import ProductDetailsDescription from './ProductDetailsDescription';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
export const initialProduct: product = {
  uuid: 0,
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
};
const style = ['#모던', '#페미닌', '#가디건'];

// 상품클릭 시 나오는 모달
const ProductDetailModal = () => {
  const { productId } = useParams(); // url에서 productId받아오기
  const navigate = useNavigate();

  const { setDetailModalOpen, fromPath } = useModalOpenStore();
  const { selectedProductId, setWillSelectedProductId } = useProductIdStore();
  const [productDetails, setProductDetails] = useState<product>(initialProduct);
  const prevPath = localStorage.getItem('pathname');

  // * 아이템을 선택해서 모달이 띄워지는게 아니라, 새로고침시 띄워질 경우,
  //  현재 경로에 따라서 all 이면 all 로 돌아오고 메인이면 메인으로 돌아가도록
  // ! 새로고침하면 fromPath 상태 다 날아감.. => localStorage 에 저장?
  useEffect(() => {
    console.log(fromPath);
    if (!selectedProductId) {
      setWillSelectedProductId(Number(productId));
      setDetailModalOpen(true, window.location.pathname);
      if (prevPath === '/all') {
        navigate('/all', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [productId, selectedProductId, setDetailModalOpen, setWillSelectedProductId]);

  // selectedProductId 바뀔때마다 fetchProductDetail 바꿔주기
  useEffect(() => {
    fetchProductDetail(selectedProductId);
  }, [selectedProductId]);
  // fetchProductDetail id에 맞는 정보 불러오기
  const fetchProductDetail = async (selectedProductId: number) => {
    try {
      const response = await instance.get(VITE_BASE_REQUEST_URL + `/products/${selectedProductId}/`);
      // console.log(response.data);
      setProductDetails(response.data);
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
    if (prevPath === '/all') {
      navigate('/all', { replace: true });
    } else {
      navigate('/', { replace: true });
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
              <div className="w-1/2 pr-10 flex flex-col sm:w-full sm:pr-0 sm:justify-center sm:items-center">
                {productDetails.images.length > 0 && (
                  <img src={productDetails.images[0].image} className="w-96 h-[410px]" alt="상품 이미지" />
                )}
                <div className="flex flex-row justify-between text-mainBlack mt-2 mb-2 pl-2 pr-2">
                  <div className="text-lg font-semibold">대여비</div>
                  <div className="text-base">{productDetails.rental_fee.toLocaleString()}(1일)</div>
                </div>
                <div className="pl-2 pr-2">
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
