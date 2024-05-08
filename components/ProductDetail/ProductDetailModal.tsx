"use client";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useRef } from "react";
import ModalStyleButton from "./ModalStyleButton";
import ProductDetailsDescription from "./ProductDetailsDescription";

interface PropsType {
  detailModalOpen: boolean;
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const style = ["#모던", "#페미닌", "#가디건"];

// 상품클릭 시 나오는 모달
const ProductDetailModal = ({
  detailModalOpen,
  setDetailModalOpen,
}: PropsType) => {
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setDetailModalOpen(false);
  };

  return (
    detailModalOpen && (
      // 바깥영역
      <div
        className="flex w-ful h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center"
        ref={outerBoxRef}
        onClick={(e) => {
          if (e.target === outerBoxRef.current) {
            handleCloseModal();
          }
        }}
      >
        {/*모달 */}
        <div className="flex flex-row justify-center pl-10 pr-10 bg-mainWhite h-3/4 w-8/12 pt-10 pb-5 rounded-lg relative">
          {/* 닫힘버튼 */}
          <XMarkIcon
            className="w-6 h-6 text-mainBlack absolute right-5 top-5 cursor-pointer"
            onClick={handleCloseModal}
          />

          {/* 사진영역 */}
          <div className="w-1/2 pr-10 pb-20 flex flex-col">
            <img
              src="https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg"
              className="w-full aspect-[3/3.5] h-full "
            />
            <div className="flex flex-row justify-between text-mainBlack mt-2 mb-2 pl-2 pr-2">
              <div className="text-lg font-semibold">대여비</div>
              <div className="text-base ">8,000(1일)</div>
            </div>
            <div className="pl-2 pr-2">
              {style.map((product) => (
                <ModalStyleButton>{product}</ModalStyleButton>
              ))}
            </div>
          </div>
          {/* text영역 */}
          <ProductDetailsDescription />
        </div>
      </div>
    )
  );
};

export default ProductDetailModal;
