'use client';
import CommonButton from '@/components/CommonButton';
import { PhotoIcon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';

const dragStyle = {
  box: 'bg-[#ebe9e935] w-full h-[300px] flex flex-col items-center justify-center rounded-lg  border border-dashed border-[#FF5634] py-10 mt-5 ',
  img: 'mx-auto h-60 w-6h-60 text-gray-300 text-mainBlack',
  text: 'mt-5 text-mainBlack ',
};
const style = {
  box: ' w-full  h-[300px] flex flex-col items-center justify-center rounded-lg  hover:cursor-pointer border border-dashed border-mainWhite py-10 mt-5',
  img: 'mx-auto h-60 w-6h-60 text-gray-300   ',
  text: 'mt-5',
};
interface IFileTypes {
  id: number; // 파일들의 고유값 id
  object: File;
}
const imgReg = () => {
  // 업로드된 사진에 대한 상태
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const [showImages, setShowImages] = useState([]);
  //드래그앤드롭 됐는지 안됐는지 확인하기 위해 스타일 변경
  const [isDragging, setIsDragging] = useState<boolean>(false);
  // 구현할 InputDragDrop에서 파일이 선택될 때 상태를 업데이트 한다.
  const handleFileSelect = (file: File | null) => {
    setFiles(file);
    alert('사진등록');
  };

  // 파일 업로드를 처리하는 로직
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 5) {
      imageUrlLists = imageUrlLists.slice(0, 5);
    }

    setShowImages(imageUrlLists);
  };
  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  // 사진이 박스를 진입할때
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); // 브라우저 이벤트 방지(이미지 넣으면 새 창 열리는거 방지해주는 역할)
    e.stopPropagation(); // 부모 이벤트 방지
    setIsDragging(true);
  };

  // 사진이 박스를 벗어날때
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 사진이 박스안에 있을 때
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 사진을 박스에서 드롭할때
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  // Drag & Drop이 아닌 클릭 이벤트로 업로드 기능
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleFileSelect(file);
    // input 요소의 값 초기화
    e.target.value = '';
    console.log(file);
  };

  return (
    <>
      <div className="w-[600px] md:w-[400px] sm:w-[400px]  m-auto flex flex-col justify-center items-center mt-10 ">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="">상품 이미지 등록</p>
          <label
            className={isDragging ? dragStyle.box : style.box}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              id="fileUpload"
              style={{ display: 'none' }}
              multiple={true} // 파일 다중선택 허용
              onChange={handleUpload}
            />

            <PhotoIcon className={isDragging ? dragStyle.img : style.img} aria-hidden="true" />
            <p className={isDragging ? dragStyle.text : style.text}>클릭하거나 파일을 여기에 드롭하여 선택하세요</p>
          </label>
          <div className=" w-full h-[100px] flex justify-center items-center">
            {showImages.map((image, id) => (
              // 히나의 사진
              <div key={id} className=" w-20 h-20 flex mr-3 relative">
                <div className="w-20 h-20 border bg-mainWhite">
                  <img src={image} alt={`${image}-${id}`} className="object-contain w-full h-full" />
                </div>

                <XMarkIcon
                  className="w-3 h-3 absolute right-1 top-1 cursor-pointer text-mainBlack"
                  onClick={() => handleDeleteImage(id)}
                />
              </div>
            ))}{' '}
          </div>
        </div>

        <CommonButton className=" w-80 rounded-lg bg-mainWhite mt-5 py-3 font-semibold text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
          다음
        </CommonButton>
      </div>
    </>
  );
};

export default imgReg;
