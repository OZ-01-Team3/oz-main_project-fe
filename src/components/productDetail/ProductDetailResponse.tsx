import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { product } from '../Products';
import ProductDetailResDescription from './ProductDetailResDescription';
export interface ProductDetailResponseProps {
  productDetails: product;
}
const ProductDetailResponse = ({ productDetails }: ProductDetailResponseProps) => {
  const { productId } = useParams(); // url에서 productId받아오기
  const navigate = useNavigate();

  const { setDetailModalOpen } = useModalOpenStore();
  const { selectedProductId, setWillSelectedProductId } = useProductIdStore();

  const prevPath = localStorage.getItem('pathname');

  // * 아이템을 선택해서 모달이 띄워지는게 아니라, 새로고침시 띄워질 경우,
  //  현재 경로에 따라서 all 이면 all 로 돌아오고 메인이면 메인으로 돌아가도록
  // ! 새로고침하면 fromPath 상태 다 날아감.. => localStorage 에 저장?

  useEffect(() => {
    if (!selectedProductId) {
      setWillSelectedProductId(productId);
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
      <div className="w-full  flex flex-col overflow-y-scroll justify-center items-center h-screen  lg:hidden xl:hidden">
        {/* 헤더 */}
        <div className="w-full bg-mainBlack h-16 font-didot text-white flex justify-center items-center text-2xl  ">
          Coaty Closet
          {/* 닫힘버튼 */}
          <XMarkIcon
            className="w-6 h-6 text-mainWhite absolute right-5 top-4 cursor-pointer"
            onClick={handleCloseModal}
          />
        </div>
        <div className="flex flex-col justify-start items-center bg-white relative w-full h-full   overflow-y-scroll rounded-none pb-5 ">
          <ProductDetailResDescription productDetails={productDetails} />
        </div>
        <button className="bg-mainBlack w-full text-mainWhite p-3  ">1:1 채팅</button>

        <button
          className="bg-mainBlack w-full text-mainWhite p-3  "
          onClick={() => {
            setDetailModalOpen(false);
            //바로 navigate 하면 모달이 안닫혀서 overflow:hidden 속성이 남아있어서 setTimeout 썻읍니다.
            setTimeout(() => {
              navigate(`/img-update/${productDetails.uuid}`, { state: productDetails.uuid });
            }, 100);
          }}
        >
          수정하기
        </button>
      </div>
    </>
  );
};

export default ProductDetailResponse;
