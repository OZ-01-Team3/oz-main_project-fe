// export default ChatAcceptModal;
import { Dispatch, SetStateAction } from 'react';
import ChatModal from './ChatModal';
interface SetModalProps {
  setAcceptModalOpen: Dispatch<SetStateAction<boolean>>;
}
const ChatAcceptModal = ({ setAcceptModalOpen }: SetModalProps) => {
  const handleCloseModal = () => {
    setAcceptModalOpen(false);
  };

  return (
    // 공통적인 모달 내용 합쳐놓은 컴포넌트
    <ChatModal
      closeModal={setAcceptModalOpen}
      modalTitle="로라로라 장원영 가디건"
      buttonText="대여확정하기"
      onButtonClick={handleCloseModal}
      checkMessage={
        <>
          실제 대여 상품이 상품 정보와 다른 경우, <br />
          해당 상품에 대한 환불이 청구될 수 있습니다.
        </>
      }
    >
      <div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 대여일자</p>
          <div className="w-36 border-[#d3d3d3] border rounded-lg text-sm h-9 flex justify-center items-center text-center">
            2024.03.28
          </div>
        </div>
        <div className="flex justify-center items-center mb-3">
          <p className="mr-2"> 반납일자</p>
          <div className="w-36 border-[#d3d3d3] border rounded-lg text-sm h-9 flex justify-center items-center text-center">
            2024.03.28
          </div>
        </div>
      </div>
    </ChatModal>
  );
};

export default ChatAcceptModal;
