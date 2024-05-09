import React from "react";

const ProductReg = () => {
    
  return (

    <form className="  px-36">
        <br></br>
        <p className="text-left text-3xl ">상품 정보</p>
        <hr className=" w-12/12 ml-auto mr-auto mt-6 mb-7 text-mainWhite " />
    <div>
      <div className="mb-4">
        <div className="flex items-center">
          <span className=" w-48 flex-shrink-0 text-left mr-1">상품명 </span>
          <input
            className="shadow appearance-none border rounded  w-7/12 py-2 px-4 text-subGray leading-tight focus:outline-none focus:shadow-outline "
            type="text"
            placeholder="상품명을 입력하세요"
          />
          <span className="text-sm text-white ml-3">0/40</span>
        </div>
      </div>
      <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
      
      <div className="mb-4">
        <div className="flex items-center">
          <span className=" w-48  flex-shrink-0 text-left mr-1">대여비</span>
          <input
            className="shadow appearance-none border rounded w-7/12 py-2 px-4 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="대여비를 입력하세요"
          />
          <span className=" text-sm text-white ml-3">원</span>
        </div>
      </div>
      <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
      <div className="mb-4">
        <div className="flex items-center">
          <span className="w-48 flex-shrink-0 text-left mr-1">사이즈</span>
          <select
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline mt-1"
          >
            <option value="">S,M,L</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          </div>
        </div>
        <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
        <div className="mb-4">
        <div className="flex items-center">
          <span className=" w-48  flex-shrink-0 text-left mr-1">브랜드 </span>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="브랜드"
          />
        </div>
      </div>
      <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
        <div className="mb-4">
        <div className="flex items-center">
          <span className="w-48 flex-shrink-0 text-left mr-1">카테고리</span>
          <select
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline mt-1"
          >
            <option value="">전체</option>
            <option value="아우터">아우터</option>
            <option value="상의">상의</option>
            <option value="하의">하의</option>
            <option value="잡화">잡화</option>
            <option value="신발">신발</option>
          </select>
          </div>
        </div>
        <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>

      <div className="mb-4">
        <div className="flex items-center">
          <span className="w-48 flex-shrink-0 text-left mr-1">구매시기 </span>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-4 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="date"
          />
      </div>
    </div>
    <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
    


    <div className="mb-4">
        <div className="flex items-center">
          <span className=" w-48  flex-shrink-0 text-left   mr-1">설명 </span>
          <input
            className=" text-left shadow appearance-none border rounded w-8/12 py-20 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="상품 설명을 최대한 자세히 적어주세요."
          />
        </div>
      </div>
      <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>
      <div className="mb-4">
        <div className="flex items-center">
          <span className="w-48 flex-shrink-0 text-left mr-1">태그 (선택) </span>
          <input
            className="shadow appearance-none border rounded w-8/12 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="태그를 입력해주세요. (최대 5개)"
          />
        </div>
        <div className="ml-52 mt-2 text-left text-sm text-gray-500">- 태그는 띄어쓰기로 구분되며 최대 N자까지 입력할 수 있어요.</div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <p className="text-left text-3xl ">추가 정보</p>
      <hr className=" w-12/12 ml-auto mr-auto mt-6 mb-7 text-mainWhite " />

      <div className="mb-4">
        <div className="flex items-center">
          <span className=" w-48 flex-shrink-0 text-left mr-1">수량 </span>
          <input
            className=" text-right shadow appearance-none border rounded w-4/12 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline "
            type="text"
            placeholder="개 "
          />
          <span className=" text-sm text-white ml-1 mt-2">개</span>
        </div>
        </div>
        <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>

          {/* 거래지역 입력 */}
      <div className="mb-4">
        <div className="flex items-center">
          <span className="w-48 flex-shrink-0 text-left mr-1">거래지역</span>
          <div className=" flex items-start flex-col">
          <input
            className="text-center shadow appearance-none border rounded w-20 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="내 위치"
          />
          <input
          className=" shadow appearance-none border rounded w-80 py-2 px-3 text-subGray leading-tight focus:outline-none focus:shadow-outline mt-2 "
          type="text"
          placeholder="지역 주소"
        />
        </div>
        </div>
        
      </div>
      <hr className=" w-12/12 ml-auto mr-auto mt-5 mb-5 border-stone-800 "/>

    </div>
    </form>
  );
}

export default ProductReg;




