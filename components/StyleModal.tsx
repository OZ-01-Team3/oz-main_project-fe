"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import closeIcon from "../public/images/closeIcon.png";
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
  //  최초로그인 상태에 따라 모달 열고닫고 할건데, 일단 로그인 상태가 없으니 페이지 새로고침할때마다 열리게 해뒀어요
  useEffect(() => {
    setStyleModalOpen(true);
  }, []);
  //  styleModalOpen 이 true 이면 모달 보여줌
  return (
    styleModalOpen && (
      <div
        className="flex w-ful h-screen fixed inset-0 z-50 bg-modalBg justify-center items-center "
        ref={outerBoxRef}
        onClick={(e) => {
          if (e.target === outerBoxRef.current) {
            setStyleModalOpen(false);
          }
        }}
      >
        <div className="flex flex-col justify-center pl-10 pr-10  bg-mainWhite h-2/4 w-2/6 pt-10 pb-10 rounded-xl">
          <div className="flex flex-col mb-5">
            <div className="flex flex-row w-full justify-between  bg-mainWhite">
              <h1 className=" bg-mainWhite text-mainBlack text-3xl font-bold pb-3 ">
                관심스타일
              </h1>{" "}
              <div className=" flex justify-end bg-mainWhite text-mainBlack cursor-pointer">
                <Image
                  src={closeIcon}
                  alt="닫힘아이콘"
                  className="w-6 h-6 bg-transparent"
                  ref={outerBoxRef}
                />
              </div>
            </div>
            <p className=" bg-mainWhite text-mainBlack w-full text-sm">
              맞춤 스타일 추천을 위해 관심 스타일을 선택해주세요.
            </p>
            <p className=" bg-mainWhite text-mainBlack w-full text-sm">
              (최대 5개까지 선택)
            </p>
          </div>
          {/* 각각의 스타일 버튼  - 스타일 맵 돌려서 컴포넌트 children으로 들어가게 */}
          <div className="bg-transparent w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2 justify-center items-center overflow-y-scroll ">
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
