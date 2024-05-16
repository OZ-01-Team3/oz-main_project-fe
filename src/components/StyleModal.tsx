
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import StyleButton from "./StyleButton";
const styles = [
  "캐주얼",
  "페미닌",
  "아메카지",
  "모던",
  "하이틴",
  "Y2K",
  "프레피룩",
  "유니섹스",
  "스트릿",
  "매니쉬",
  "스포티",
  "에스닉",
  "그런지",
  "테크웨어",
  "밀리터리",
];

const StyleModal = () => {
  const [styleModalOpen, setStyleModalOpen] = useState(false);
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  console.log(outerBoxRef);
  //  최초로그인 상태에 따라 모달 열고닫고 할건데, 일단 로그인 상태가 없으니 페이지 새로고침할때마다 열리게 해뒀어요
  useEffect(() => {
    setStyleModalOpen(true);
  }, []);
  // 모달 닫는 함수
  const handleCloseModal = () => {
    setStyleModalOpen(false);
  };
  //  styleModalOpen 이 true 이면 모달 보여줌
  return (
    styleModalOpen && (
      // 바깥영역
      <div
        className="flex w-ful h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center "
        ref={outerBoxRef}
        onClick={(e) => {
          if (e.target === outerBoxRef.current) {
            handleCloseModal();
          }
        }}
      >
        {/* 모달 */}
        <div className="flex flex-col justify-center pl-10 pr-10 bg-mainWhite h-96   text-mainBlack w-modalWidth pt-10 pb-10 rounded-xl">
          <div className="flex flex-col mb-5">
            <div className="flex flex-row w-full justify-between">
              <h1 className=" text-3xl font-bold pb-3 ">관심스타일</h1>
              <div className=" flex justify-end cursor-pointer">
                <XMarkIcon className="w-6 h-6" onClick={handleCloseModal} />
              </div>
            </div>
            <p className=" w-full text-sm">
              맞춤 스타일 추천을 위해 관심 스타일을 선택해주세요.
            </p>
            <p className=" w-full text-sm">(최대 5개까지 선택)</p>
          </div>
          {/* 각각의 스타일 버튼  - 스타일 맵 돌려서 컴포넌트 children으로 들어가게 */}
          <div className="w-full grid grid-cols-3 gap-x-5 gap-y-2 justify-center items-center overflow-y-scroll ">
            {styles.map((style) => (
              <StyleButton>{style}</StyleButton>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default StyleModal;
