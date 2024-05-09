import React from "react";

const ProductReg = () => {
    
  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">상품명</label>
        <input
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="상품명을 입력하세요"
        />
      </div>
      <div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">대여비</label>
        <input
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="대여비를 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">구매시기</label>
        <input
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
        />
      </div>
    </div>
    </div>
  );
}

export default ProductReg;


