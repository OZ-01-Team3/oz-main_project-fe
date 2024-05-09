import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import ProductDetailResDescription from './ProductDetailResDescription';

interface PropsType {
  setDetailModalOpen: Dispatch<SetStateAction<boolean>>;
}
const ProductDetailResponse = ({ setDetailModalOpen }: PropsType) => {
  const handleCloseModal = () => {
    setDetailModalOpen(false);
  };
  return (
    <div className="w-full  flex flex-col overflow-y-scroll justify-center items-center h-screen  lg:hidden xl:hidden">
      {/* 헤더 */}
      <div className="w-full bg-mainBlack h-16 font-didot text-white flex justify-center items-center text-2xl  ">
        Coaty Closet
      </div>
      <div className="flex flex-col justify-start items-center bg-white relative w-full h-full   overflow-y-scroll rounded-none pb-5 ">
        {/* 닫힘버튼 */}
        <XMarkIcon
          className="w-6 h-6 text-mainBlack absolute right-5 top-5 cursor-pointer"
          onClick={handleCloseModal}
        />
        <ProductDetailResDescription />
      </div>
      <button className="bg-mainBlack w-full text-mainWhite p-3  ">1:1 채팅</button>
    </div>
  );
};

export default ProductDetailResponse;
