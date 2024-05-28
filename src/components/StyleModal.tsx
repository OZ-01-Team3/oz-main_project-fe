import useStyleTagStore from '@/stores/useStyleTagStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

const StyleModal = () => {
  const { styleTag, setStyleTag } = useStyleTagStore();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [styleModalOpen, setStyleModalOpen] = useState(false);

  useEffect(() => {
    handleGetStyle();
  }, []);
  // 스타일 태그들 가져오기
  const handleGetStyle = async () => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/categories/styles/`);
      console.log(response, '상품 스타일 가져오기 성공');
      console.log(response.data);
      setStyleTag(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // 태그 선택하면 배열에 담아주기
  const handleTagClick = (tagId: number) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };
  if (selectedTags.length > 5) {
    selectedTags.splice(5);
    toast.info('태그는 최대 다섯 개까지 선택가능합니다!');
  }
  // 확인 눌렀을 때 로컬에 배열 저장
  const handleSubmitStyle = () => {
    localStorage.setItem('style', JSON.stringify(selectedTags));
    setStyleModalOpen(false);
  };
  // 바깥이랑 x 눌렀을때 모달 닫히도록
  const outerBoxRef = useRef(null);
  // console.log(outerBoxRef);
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
        onClick={e => {
          if (e.target === outerBoxRef.current) {
            handleCloseModal();
          }
        }}
      >
        {/* 모달 */}
        <div className="flex flex-col justify-center pl-10 pr-10 bg-mainWhite h-96   text-mainBlack w-modalWidth pt-5 rounded-xl">
          <div className="flex flex-col mb-5">
            <div className="flex flex-row w-full justify-between">
              <h1 className=" text-3xl font-bold  pb-2  ">관심스타일</h1>

              <div className=" flex justify-end cursor-pointer">
                <XMarkIcon className="w-6 h-6" onClick={handleCloseModal} />
              </div>
            </div>
            <p className=" w-full text-sm">맞춤 스타일 추천을 위해 관심 스타일을 선택해주세요.</p>
            <p className=" w-full text-sm">(최대 5개까지 선택)</p>
          </div>
          {/* 각각의 스타일 버튼  - 스타일 맵 돌려서 컴포넌트 children으로 들어가게 */}
          <div className="w-full grid grid-cols-3 gap-x-5 gap-y-2 justify-center items-center ">
            {styleTag.map(style => (
              <button
                key={style.id}
                className={`border border-mainBlack text-mainBlack rounded-full pt-2 pb-2 pl-6 pr-6 w-28 text-center hover:cursor-pointer ${selectedTags.includes(style.id) ? 'bg-mainBlack text-mainWhite ' : ''}`}
                onClick={() => handleTagClick(style.id)}
              >
                {style.name}
              </button>
            ))}
          </div>
          <button className="mt-4 text-md font-medium" onClick={handleSubmitStyle}>
            저장하기
          </button>
        </div>
      </div>
    )
  );
};

export default StyleModal;
