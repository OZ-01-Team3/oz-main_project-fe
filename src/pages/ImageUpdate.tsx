import instance from '@/api/instance';
import CommonButton from '@/components/CommonButton';
import { product } from '@/components/Products';
import { initialProduct } from '@/components/productDetail/ProductDetailModal';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FileType, dragStyle, style } from './imgRegistration';

const ImageUpdate = () => {
  //이전 정보 저장하는 state
  const [prevProductInformation, setPrevProductInformation] = useState<product>(initialProduct);

  // 수정페이지 접속하면 이전에 사용자가 등록한 이미지 불러오기
  // id는 클릭했을때 상품에서 가져오기..(https 수정할 것 !)
  useEffect(() => {
    fetchProductImage(id);
  }, []);
  const fetchProductImage = async (id: number) => {
    const response = await instance.get(`/products/${id}`);
    console.log('상품정보 가져오기 성공', response);
    setPrevProductInformation(response.data.results);
    setFileList(prevProductInformation.images); //이미지만 가져와서 원래 상태에 넣어주기
  };

  //이미지 수정
  const [fileList, setFileList] = useState<FileType[]>([]); // 파일 및 이미지 URL 상태
  const [isDragging, setIsDragging] = useState<boolean>(false); // 드래그 상태
  const navigate = useNavigate();
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

  //사진 드랍해서 놓을 때
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    // 불변성 관리 위해 복사
    const newFileList: FileType[] = [...fileList];
    // dataTransfer => 드래그 앤 드롭 작업 중에 드래그되고 있는 데이터를 보관하기 위해 사용하는것임!
    const files = e.dataTransfer.files;
    // 파일 추가
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      newFileList.push({ id: fileList.length + i, file, imageUrl });
    }

    if (newFileList.length > 5) {
      newFileList.splice(5); // 최대 5장까지 제한
      toast.error('사진은 최대 다섯 장까지 등록할 수 있습니다.');
      return;
    }
    setFileList(newFileList);
    setPrevProductInformation({
      ...prevProductInformation,
      images: newFileList,
    });
  };
  // fileList 업데이트
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedFileList = [...fileList, { id: fileList.length, file, imageUrl }];
      setFileList([...fileList, { id: fileList.length, file, imageUrl }]);
      setPrevProductInformation({
        ...prevProductInformation,
        images: updatedFileList,
      });
    }
  };
  // 사진 미리보기 X 누르면 지우는 함수
  const handleDeleteImage = (id: number) => {
    const filteredList = fileList.filter(item => item.id !== id);
    setFileList(filteredList);
    setPrevProductInformation({
      ...prevProductInformation,
      images: filteredList,
    });
  };
  // 사진등록하는 함수
  const handleSubmitProductImg = async () => {
    if (fileList.length === 0) {
      toast.error('사진을 한장 이상 등록해주세요!');
      return;
    }
    try {
      const formData = new FormData();

      // fileList에 있는 각 파일을 FormData에 추가
      fileList.forEach(item => {
        formData.append('file', item.file); // 'images'는 서버에서 받는 필드명으로 수정해야함
        console.log(item.file);
      });

      //** 등록한 이미지 product-reg로 보내기 */
      navigate('/product-update', { state: prevProductInformation });
    } catch (error) {
      console.error('상품 등록 실패:', error);
    }
  };
  return (
    <div className="w-[500px] md:w-[400px] sm:w-[400px] mx-auto flex flex-col justify-between items-center h-[calc(100vh-95.99px)]">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-xl">상품 이미지 등록</p>
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
            multiple // 파일 여러개 올릴 수 있는 속성
            onChange={handleChange}
          />
          <PhotoIcon className={isDragging ? dragStyle.img : style.img} aria-hidden="true" />
          <p className={isDragging ? dragStyle.text : style.text}>
            클릭하거나 파일을 여기에 드롭하여 선택하세요 (최대 5장)
          </p>
        </label>
        {/* 사진 미리보기 박스  - 한 장 이상 등록하면 '다음'버튼이 밑으로 내려가면서 미리보기 생성됨*/}
        {fileList.length > 0 && (
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
        )}

        <CommonButton
          onClick={handleSubmitProductImg}
          className="w-80 rounded-lg mt-10 bg-mainWhite py-3 font-semibold text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          다음
        </CommonButton>
      </div>
    </div>
  );
};

export default ImageUpdate;
