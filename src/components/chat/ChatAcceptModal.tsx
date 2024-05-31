// export default ChatAcceptModal;
import instance from '@/api/instance';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatDate } from './ChatComponent';
import ChatModal from './ChatModal';
export interface rentalHistory {
  id: number;
  status: string;
  rental_date: string;
  return_date: string;
}
export interface message {
  id: number;
  nickname: string;
  updated_at: string;
  created_at: string;
  text: string;
  image: string;
  status: true;
  chatroom: number;
}

export interface productInfo {
  product_image: string;
  product_name: string;
  product_rental_fee: string;
  product_condition: string;
  messages: message[];
  rental_history: rentalHistory;
}
interface SetModalProps {
  setAcceptModalOpen: Dispatch<SetStateAction<boolean>>;
  productInfo: productInfo;
}
const ChatAcceptModal = ({ setAcceptModalOpen, productInfo }: SetModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCloseModal = () => {
    setAcceptModalOpen(false);
  };
  const rentalId = productInfo.rental_history.id;
  //대여확정
  const handleAcceptRental = async () => {
    try {
      await instance.patch(`/products/rental_history/${rentalId}/`, {
        status: 'ACCEPT',
      });
      // console.log(response);
      handleCloseModal();
      alert('대여가 확정되었는대용');
    } catch (error) {
      console.error("대여 확정 실패", error);
    }
  };

  return (
    // 공통적인 모달 내용 합쳐놓은 컴포넌트
    <ChatModal
      productInfo={productInfo}
      closeModal={handleCloseModal}
      modalTitle={productInfo.product_name}
      buttonText="대여확정하기"
      onButtonClick={handleAcceptRental}
      checkMessage={
        <>
          실제 대여 상품이 상품 정보와 다른 경우, <br />
          해당 상품에 대한 환불이 청구될 수 있습니다.
        </>
      }
      isChecked={isChecked}
      handleCheckboxChange={handleCheckboxChange}
    >
      <div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 대여일자</p>
          <div className="w-36 border-[#d3d3d3] border rounded-lg text-sm h-9 flex justify-center items-center text-center">
            {formatDate(productInfo.rental_history.rental_date)}
          </div>
        </div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 반납일자</p>
          <div className="w-36 border-[#d3d3d3] border rounded-lg text-sm h-9 flex justify-center items-center text-center">
            {formatDate(productInfo.rental_history.return_date)}
          </div>
        </div>
      </div>
    </ChatModal>
  );
};

export default ChatAcceptModal;
