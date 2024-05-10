import { PhotoIcon } from '@heroicons/react/16/solid';
import React from 'react';

const DetailImg = () => {
    return (
        <div className="col-span-full">

          <p className="text-center text-x leading-10 text-mainWhite py-24" >상품 이미지 등록</p>
      
        <div className="mt-5 flex justify-center rounded-lg border border-dashed border-mainWhite px-6 py-10">
          <div className="text-center">
            <PhotoIcon className="mx-auto h-52 w-52 text-gray-300" aria-hidden="true" />
       
          
            
            <div className="mt-4 flex text-sm leading-6 text-mainWhite">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>파일 업로드</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
           <p className="text-xs leading-5 text-mainWhite">클릭하거나 파일을 여기에 드롭하여 선택하세요</p>
                 
          </div>
        </div>
      </div>
    );
}

export default DetailImg;
