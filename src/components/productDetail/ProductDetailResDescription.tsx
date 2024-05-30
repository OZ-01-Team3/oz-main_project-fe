import { UserCircleIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ModalStyleButton from './ModalStyleButton';
import { ProductDetailResponseProps } from './ProductDetailResponse';
import ProductDetailTitle from './ProductDetailTitle';

const ProductDetailResDescription = ({ productDetails }: ProductDetailResponseProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleNextImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % productDetails.images.length);
  };
  const handlePrevImage = () => {
    setCurrentImageIndex(prevIndex => (prevIndex - 1 + productDetails.images.length) % productDetails.images.length);
  };

  const productRegistered = productDetails.lender;

  const filterStyleTag = productDetails.styles.slice(0, 3);
  return (
    <>
      <div className="w-full text-mainBlack" key={productDetails.uuid}>
        <div className="flex flex-col pr-0 mt-4 justify-center items-center mx-auto">
          <div className="flex flex-col w-full relative">
            <div className="w-full h-[410px] overscroll-x-none flex relative ">
              <ChevronLeftIcon
                onClick={handlePrevImage}
                className="absolute w-7 h-7 left-3 top-48 text-mainBlack cursor-pointer"
              />
              <ChevronRightIcon
                onClick={handleNextImage}
                className="absolute  w-7 h-7 right-3 top-48 text-mainBlack cursor-pointer"
              />
              {productDetails.images.length > 0 && (
                <img
                  src={productDetails.images[currentImageIndex].image}
                  className="w-full h-full object-contain "
                  alt="상품 이미지"
                />
              )}
            </div>
          </div>
          <div className="pl-2 pr-2 py-2 mt-4">
            {filterStyleTag &&
              filterStyleTag.length > 0 &&
              filterStyleTag.map((product, idx) => <ModalStyleButton key={idx}>{product}</ModalStyleButton>)}
          </div>
          <h1 className="text-3xl font-bold  text-center mb-4 w-96 ">{productDetails.name}</h1>
          <div className="flex flex-row justify-between text-mainBlack mb-2 pl-2 pr-2"></div>
        </div>
        <div className="w-[400px] m-auto ">
          <ProductDetailTitle title="대여비" detail={productDetails.rental_fee.toLocaleString()} />
          <ProductDetailTitle title="브랜드" detail={productDetails.brand} />
          <ProductDetailTitle title="사이즈" detail={productDetails.size} />
          <ProductDetailTitle title="구매시기" detail={productDetails.purchase_date} />
          <ProductDetailTitle title="상품상태" detail={productDetails.condition} />
          <ProductDetailTitle title="상세설명" detail={productDetails.description} />
        </div>
        <div className=" m-auto  w-[400px]  pb-2">
          <p className="text-base font-semibold mt-3">옷장 주인</p>
          {/* 옷장주인 박스 */}
          <div className="flex flex-row p-1  justify-between items-center mb-9 border ">
            <div className="flex flex-row ">
              {productRegistered.profile_img == '' ? (
                <img src={productRegistered.profile_img} className="w-14 h-14 aspect-[1/1] mr-2" />
              ) : (
                <UserCircleIcon className="w-14 h-14 mr-3 text-gray-300 " aria-hidden="true" />
              )}

              <div className="flex flex-col justify-around  mx-auto">
                <p className="text-sm font-bold">{productRegistered.nickname}</p>
                <p className="text-sm">대여중인 옷: 109개</p>
              </div>
            </div>
            <div
              className="border rounded-full border-mainBlack text-sm p-1 w-24 text-center hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer mr-3 "
              onClick={() => toast.info('준비중입니당^___^')}
            >
              옷장 구경하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailResDescription;
