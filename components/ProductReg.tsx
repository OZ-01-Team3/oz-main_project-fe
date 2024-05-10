import React from "react";
import CommonButton from "@/components/CommonButton";

const ProductReg = () => {
    
  return (

    <form className="px-36">
    <p className="text-left text-3xl mt-28">상품 정보</p>
    <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />
    <div>
        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">상품명 </span>
                <input
                    className="shadow appearance-none border rounded w-full md:w-7/12 py-2 px-4 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    type="text"
                    placeholder="상품명을 입력하세요"/>
                <span className="text-sm text-white ml-3">0/40</span>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">대여비</span>
                <input
                    className=" shadow appearance-none border rounded w-full md:w-7/12 py-2 px-4 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    type="text"
                    placeholder="대여비를 입력하세요"/>
                <span className=" text-sm text-white ml-7 text-right"> 원</span>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">사이즈</span>
                <select
                    className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-1 focus:border-mainWhite focus:bg-mainWhite">
                    <option value="">S,M,L</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">브랜드 </span>
                <input
                    className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    type="text"
                    placeholder="브랜드"/>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">카테고리</span>
                <select
                    className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-1 focus:border-mainWhite focus:bg-mainWhite">
                    <option value="">전체</option>
                    <option value="아우터">아우터</option>
                    <option value="상의">상의</option>
                    <option value="하의">하의</option>
                    <option value="잡화">잡화</option>
                    <option value="신발">신발</option>
                </select>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">구매시기</span>
                <input
                    className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-4 text-mainBlack leading-tight focus:outline-none focus:shadow-outline "
                    type="date"/>
            </div>
        </div>
        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="flex items-left">
  <span className="w-48 flex-shrink-0 text-left mr-1">상품 상태</span>
  <div className="flex items-start flex-col">
    <div className="flex items-center">
      <input type="radio" id="1" name="pro" className="  focus:border-mainWhite focus:bg-mainWhite  mr-5"/>
      <label htmlFor="pro1">새 상품 (미사용)</label>
      <span className="text-sm text-subGray ml-7 text-right"> 사용하지 않은 상품</span>
    </div>

    <div className="flex items-center">
      <input type="radio" id="2" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5"/>
      <label htmlFor="pro2">사용감 없음</label>
      <span className="text-sm text-subGray ml-7 text-right"> 사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음</span>
    </div>

    <div className="flex items-center">
      <input type="radio" id="3" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5"/>
      <label htmlFor="pro3">사용감 적음</label>
      <span className="text-sm text-subGray ml-7 text-right"> 눈에 띄는 흔적이나 얼룩이 약간 있음</span>
    </div>

    <div className="flex items-center">
      <input type="radio" id="4" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5"/>
      <label htmlFor="pro4">사용감 많음</label>
      <span className="text-sm text-subGray ml-7 text-right"> 눈에 띄는 흔적이나 얼룩이 많이 있음</span>
    </div>

  </div>
</div>



        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
    <div className="flex items-left">
        <span className="w-48 flex-shrink-0 text-left mr-1">설명</span>
        <textarea
            className="shadow appearance-none border rounded w-full md:w-8/12 py-3 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
            placeholder="상품 설명을 최대한 자세히 적어주세요."
            style={{ height: "150px" }} 
        ></textarea>
    </div>
</div>


        <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">태그 <span className="text-subGray">(선택)</span></span>
                <input
                    className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    type="text"
                    placeholder="태그를 입력해주세요. (최대 5개)"/>
            </div>
            <div className="ml-48 mt-2 text-left text-sm text-subGray">- 태그는 띄어쓰기로 구분되며 최대 N자까지 입력할 수 있어요.</div>
        </div>

        <p className="text-left text-3xl mt-28 ">추가 정보</p>
        <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />

        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">수량</span>
                <input
                    className="text-right shadow appearance-none border rounded w-62 md:w-4/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    type="text"
                    placeholder="개 "/>
                
            </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />

              
        <div className="mb-4">
            <div className="flex items-left">
                <span className="w-48 flex-shrink-0 text-left mr-1">거래지역</span>
                <div className="flex items-start flex-col">
                    <input
                        className="text-center shadow appearance-none border rounded w-4/12 md:w-20 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                        type="text"
                        placeholder="내 위치"/>
                    <input
                        className="shadow appearance-none border rounded w-full md:w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-2 placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                        type="text"
                        placeholder="서울 강남구"/>
                </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
        </div>
        <div className='text-right'>
          <CommonButton className=" align-middle w-44 rounded-lg bg-mainBlack px-auto py-3.5 text-lg font-semibold font-didot  text-mainWhite  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-2 border border-solid border-mainWhite focus:bg-mainWhite">임시저장</CommonButton>
          <CommonButton className=" align-middle w-44 rounded-lg bg-mainWhite px-auto py-3.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-2 border border-solid border-mainWhite focus:bg-mainWhite">등록하기</CommonButton>
</div>
    </div>
</form>
    
  );
}

export default ProductReg;




