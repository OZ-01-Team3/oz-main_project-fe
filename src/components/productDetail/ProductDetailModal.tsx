import { useModalOpenStore, useProductIdStore } from '@/stores/modalStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ModalPortal } from '../ModalPortal';
import ModalStyleButton from './ModalStyleButton';
import ProductDetailResponse from './ProductDetailResponse';
import ProductDetailsDescription from './ProductDetailsDescription';

interface productsDetailsType {
  id: number;
  image: string;
  title: string;
  brand: string;
  size: string;
  date: string;
  status: string;
  style: string[];
  description: string;
  price: string;
}

const initialProductDetails: productsDetailsType = {
  id: 0,
  image: '',
  title: '',
  brand: '',
  size: '',
  date: '',
  status: '',
  style: [],
  description: '',
  price: '',
};

const style = ['#모던', '#페미닌', '#가디건'];

// 상품클릭 시 나오는 모달
const ProductDetailModal = () => {
  const { productId } = useParams(); // url에서 productId받아오기
  const navigate = useNavigate();
  const currentPath = location.pathname; // 현재 URL 경로를 가져오기
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  const { selectedProductId, setWillSelectedProductId, willSelectedProductId } = useProductIdStore();
  const [productDetails, setProductDetails] = useState(initialProductDetails);

  // selectedProductI 바뀔때마다 fetchProductDetail 바꿔주기
  useEffect(() => {
    fetchProductDetail(selectedProductId);
  }, [selectedProductId]);

  // fetchProductDetail id에 맞는 정보 불러오기
  const fetchProductDetail = async (selectedProductId: number) => {
    try {
      const response = await axios.get(`/api/v1/products/${selectedProductId}`);
      console.log(response.data);
      setProductDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //  현재 경로에 따라서 all 이면 all 로 돌아오고 메인이면 메인으로 돌아가도록
  useEffect(() => {
    if (!willSelectedProductId) {
      setWillSelectedProductId(Number(productId));

      if (currentPath === '/all') {
        navigate('/all', { replace: true });
      } else if (currentPath === '/') {
        navigate('/', { replace: true });
      }
    }
  }, [productId, willSelectedProductId, navigate, currentPath]);
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setDetailModalOpen(false);
    history.back();
  };
  return (
    <>
      <ModalPortal>
        {detailModalOpen && (
          <div
            className="flex w-full h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center"
            ref={outerBoxRef}
            onClick={e => {
              if (e.target === outerBoxRef.current) {
                handleCloseModal();
              }
            }}
          >
            <ProductDetailResponse />
            {/* 모달 컨텐츠 */}
            <div className="flex flex-row justify-center pl-10 pr-10 bg-mainWhite h-[565.5px] w-[950px] lg:w-[730px] md:w-[620px] sm:w-full sm:h-full sm:flex-col pt-10 pb-5 rounded-lg relative lg:h-[500px] md:h-[400px] sm:overflow-y-scroll sm:justify-start sm:items-center sm:hidden md:hidden">
              {/* 닫기 버튼 */}
              <XMarkIcon
                className="w-6 h-6 text-mainBlack absolute right-5 top-5 cursor-pointer"
                onClick={handleCloseModal}
              />
              {/* 사진 영역 */}
              <div className="w-1/2 pr-10 flex flex-col sm:w-full sm:pr-0 sm:justify-center sm:items-center">
                <img
                  src="https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg"
                  className="w-96 h-[410px]"
                  alt="상품 이미지"
                />
                <div className="flex flex-row justify-between text-mainBlack mt-2 mb-2 pl-2 pr-2">
                  <div className="text-lg font-semibold">대여비</div>
                  <div className="text-base">8,000(1일)</div>
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
        )}
      </ModalPortal>
    </>
  );
};

export default ProductDetailModal;
