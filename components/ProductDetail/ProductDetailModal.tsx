'use client';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useRef } from 'react';
import ModalStyleButton from './ModalStyleButton';
import ProductDetailResponse from './ProductDetailResponse';
import ProductDetailsDescription from './ProductDetailsDescription';

interface PropsType {
  detailModalOpen: boolean;
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const style = ['#모던', '#페미닌', '#가디건'];

// 상품클릭 시 나오는 모달
const ProductDetailModal = ({ detailModalOpen, setDetailModalOpen }: PropsType) => {
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setDetailModalOpen(false);
  };
  return (
    detailModalOpen && (
      <>
        <div
          className="flex w-full h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center"
          ref={outerBoxRef}
          onClick={e => {
            if (e.target === outerBoxRef.current) {
              handleCloseModal();
            }
          }}
        >
          <ProductDetailResponse setDetailModalOpen={setDetailModalOpen} />
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
            <ProductDetailsDescription />
          </div>
        </div>
      </>
    )
  );
};

export default ProductDetailModal;
