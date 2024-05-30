import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction, useRef } from 'react';
import { productInfo } from './ChatAcceptModal';

interface ModalProps {
  closeModal: Dispatch<SetStateAction<boolean>>;
  modalTitle: string;
  buttonText: string;
  onButtonClick: () => void;
  children: React.ReactNode;
  checkMessage: React.ReactElement;
  isChecked: boolean;
  handleCheckboxChange: () => void;
  returnDate?: string;
  productInfo: productInfo;
}
const ChatModal = ({
  returnDate,
  closeModal,
  buttonText,
  modalTitle,
  onButtonClick,
  children,
  checkMessage,
  productInfo,
  isChecked,
  handleCheckboxChange,
}: ModalProps) => {
  const outerBoxRef = useRef(null);
  const handleCloseModal = () => {
    closeModal(false);
  };
  return (
    // 모달 뒷 배경
    <div
      className="flex w-full h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center"
      ref={outerBoxRef}
      onClick={e => {
        if (e.target === outerBoxRef.current) {
          handleCloseModal();
        }
      }}
    >
      {/* 모달 박스 */}
      <div className="flex flex-col items-center pt-20 pb-7 justify-between bg-mainWhite w-[550px] h-[400px] sm:w-[450px] rounded-lg relative">
        <div className="bg-mainBlack w-[550px] sm:w-[450px] h-12 absolute top-0 rounded-t-lg"></div>
        <XMarkIcon
          className="w-6 h-6 text-mainWhite absolute right-5 top-3 cursor-pointer"
          onClick={handleCloseModal}
        />
        <div className="flex justify-center items-center mb-5">
          <div className="h-11 w-11 mr-3 flex justify-center items-center border-customGray rounded-md border">
            <img src={productInfo.product_image} alt="상품이미지" className="object-cover h-11 w-11 rounded-md" />
          </div>
          <p className="text-xl font-semibold ">{modalTitle}</p>
        </div>
        {children}
        <div className="flex justify-center items-center flex-col">
          <p className="w-80 text-center text-xs font-thin ">{checkMessage}</p>
          <div>
            <input
              type="checkbox"
              className="w-3 h-3 mr-2 border-[#d3d3d3]  "
              required
              onChange={handleCheckboxChange}
            />
            <span className="text-xs">확인했습니다</span>
          </div>
        </div>
        <button
          className="bg-mainBlack w-52 h-10 cursor-pointer text-mainWhite rounded-lg disabled:bg-gray-200 disabled:cursor-default"
          onClick={onButtonClick}
          disabled={!isChecked || returnDate === ''}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
