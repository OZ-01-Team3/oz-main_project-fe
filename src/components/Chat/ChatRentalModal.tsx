import { Dispatch, SetStateAction } from 'react';
import ChatModal from './ChatModal';
interface SetModalProps {
  setRentalModalOpen: Dispatch<SetStateAction<boolean>>;
}
const ChatRentalModal = ({ setRentalModalOpen }: SetModalProps) => {
  const handleCloseModal = () => {
    setRentalModalOpen(false);
  };

  return (
    // 공통적인 모달 내용 합쳐놓은 컴포넌트
    <ChatModal
      closeModal={setRentalModalOpen}
      buttonText="신청하기"
      modalTitle="로라로라 장원영 가디건"
      onButtonClick={handleCloseModal}
      checkMessage={
        <>
          대여 상품 반납 시 옷의 손상이 발생한 경우, <br />
          해당 손상에 대한 추가 배상 비용이 청구될 수 있습니다.
        </>
      }
    >
      <div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 대여일자</p>
          <input type="date" className="w-36 border-[#d3d3d3] rounded-lg text-sm h-9" />
        </div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 반납일자</p>
          <input type="date" className="w-36 border-[#d3d3d3] rounded-lg text-sm h-9" />
        </div>
      </div>
    </ChatModal>
  );
};

export default ChatRentalModal;
