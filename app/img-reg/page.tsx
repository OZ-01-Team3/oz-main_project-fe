'use client';
import CommonButton from '@/components/CommonButton';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
const dragStyle = {
  box: 'bg-[#ebe9e935] w-full h-[230px] flex flex-col items-center justify-center rounded-lg  border border-dashed border-[#FF5634] py-10 mt-5 mb-3 ',
  img: 'mx-auto h-60 w-6h-60 text-gray-300 text-mainBlack',
  text: 'mt-5 text-mainBlack ',
};
const style = {
  box: ' w-full  h-[230px] flex flex-col items-center justify-center rounded-lg  hover:cursor-pointer border border-dashed border-mainWhite py-10 mt-5 mb-3',
  img: 'mx-auto h-60 w-6h-60 text-gray-300   ',
  text: 'mt-5',
};
interface FileType {
  id: number; // 파일들의 고유값 id
  file: File;
  imageUrl: string; // 파일에 대한 미리보기 이미지 URL
}

const ImgReg = () => {
  const [fileList, setFileList] = useState<FileType[]>([]); // 파일 및 이미지 URL 상태
  const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 상태

  // 사진이 박스를 진입할 때
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // 사진이 박스를 벗어날 때
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // 사진이 박스 안에 있을 때
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const newFileList: FileType[] = [...fileList];
    const files = e.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newFileList.push({ id: fileList.length + i, file, imageUrl });
    }

    if (newFileList.length > 5) {
      newFileList.splice(5); // 최대 5장까지 제한
      toast.error('사진은 최대 다섯 장까지 등록할 수 있습니다.');
    }

    setFileList(newFileList);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFileList([...fileList, { id: fileList.length, file, imageUrl }]);
    }
    e.target.value = ''; // input 값 초기화
  };

  const handleDeleteImage = (id: number) => {
    const filteredList = fileList.filter(item => item.id !== id);
    setFileList(filteredList);
  };
  const handleTest = () => {
    console.log(fileList);
  };
  return (
    <div className="w-[600px] md:w-[400px] sm:w-[400px] mx-auto flex flex-col justify-between items-center h-[calc(100vh-95.99px)]">
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
            multiple // 파일 다중 선택 허용
            onChange={handleChange}
          />
          <PhotoIcon className={isDragging ? dragStyle.img : style.img} aria-hidden="true" />
          <p className={isDragging ? dragStyle.text : style.text}>
            클릭하거나 파일을 여기에 드롭하여 선택하세요(최대 5장)
          </p>
        </label>
        {/* 사진 미리보기 박스 */}
        <div className="w-full h-[100px] flex justify-center items-center">
          {fileList.map(item => (
            <div key={item.id} className="w-20 h-20 flex mr-3 relative">
              <div className="w-20 h-20 border bg-mainWhite">
                <img src={item.imageUrl} alt={`preview-${item.id}`} className="object-contain w-full h-full" />
              </div>
              <XMarkIcon
                className="w-3 h-3 absolute right-1 top-1 cursor-pointer text-mainBlack"
                onClick={() => handleDeleteImage(item.id)}
              />
            </div>
          ))}
        </div>
        <CommonButton
          onClick={handleTest}
          className="w-80 rounded-lg mt-10 bg-mainWhite py-3 font-semibold text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          다음
        </CommonButton>
      </div>
    </div>
  );
};

export default ImgReg;
