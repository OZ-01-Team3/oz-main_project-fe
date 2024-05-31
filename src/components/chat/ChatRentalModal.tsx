import instance from '@/api/instance';
import useRentalStore from '@/stores/useRentalStore';
import { Dispatch, SetStateAction, useState } from 'react';
import { productInfo } from './ChatAcceptModal';
import ChatModal from './ChatModal';
interface SetModalProps {
  setRentalModalOpen: Dispatch<SetStateAction<boolean>>;
  productInfo: productInfo;
}

const ChatRentalModal = ({ setRentalModalOpen, productInfo }: SetModalProps) => {
  const [rentalDate, setRentalDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { borrwerId, productId } = useRentalStore();
  // console.log('빌리는 사람', borrwerId);
  // console.log('상품아이디', productId);
  // console.log('대여날짜', rentalDate);
  // console.log('반납날짜', returnDate);
  // 체크박스 체크했는지 안했는지 알아보는 상태
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  // 대여 확정 보내는 상태
  const handleRequestProduct = async () => {
    try {
      const response = await instance.post('/products/rental_history/borrow/', {
        borrower_id: borrwerId,
        rental_date: rentalDate,
        return_date: returnDate,
        status: 'REQUEST',
        product: productId,
      });
      // console.log(response);
      setRentalModalOpen(false);

      alert('상품 대여가 접수되었습니다');
    } catch (error) {
      console.error('상품대여신청 오류', error);
    }
  };
  // 오늘 날짜(오늘 날짜 이전으로는 대여 못하도록)
  const today = new Date();
  const defaultDate = today.toISOString().substring(0, 10);
  // console.log('오늘 날짜', defaultDate);
  return (
    // 공통적인 모달 내용 합쳐놓은 컴포넌트
    <ChatModal
      isChecked={isChecked}
      productInfo={productInfo}
      closeModal={setRentalModalOpen}
      buttonText="신청하기"
      modalTitle={productInfo.product_name}
      onButtonClick={handleRequestProduct}
      checkMessage={
        <>
          대여 상품 반납 시 옷의 손상이 발생한 경우, <br />
          해당 손상에 대한 추가 배상 비용이 청구될 수 있습니다.
        </>
      }
      handleCheckboxChange={handleCheckboxChange}
      returnDate={returnDate}
    >
      <div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 대여일자</p>
          <input
            type="date"
            className="w-36 border-[#d3d3d3] rounded-lg text-sm h-9"
            value={rentalDate}
            onChange={e => {
              setRentalDate(e.target.value);
            }}
            min={defaultDate}
          />
        </div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 반납일자</p>
          <input
            type="date"
            className="w-36 border-[#d3d3d3] rounded-lg text-sm h-9"
            value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            min={rentalDate}
          />
        </div>
      </div>
    </ChatModal>
  );
};

export default ChatRentalModal;
