import CommonButton from '@/components/CommonButton';
import ProductField from './ProductRegDetail';

const ProductReg = () => {
  return (
    <form className="w-full">
      <p className="text-left text-3xl mt-28">상품 정보</p>
      <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />
      <div>
        <ProductField label="상품명" placeholder="상품명을 입력하세요" type="text" maxLength={40} />
        <ProductField label="대여비" placeholder="대여비를 입력하세요" type="text" suffix="원" />
        <ProductField label="사이즈" type="select" options={['S,M,L', 'S', 'M', 'L', 'XL']} />
        <ProductField
          label="카테고리"
          placeholder="카테고리"
          type="select"
          options={['전체', '아우터', '상의', '하의', '잡화', '신발']}
        />
        <ProductField label="구매시기" type="date" />
        <ProductField
          label="상품 상태"
          type="radio"
          options={[
            { value: 'new', label: '새 상품 (미사용)', description: '사용하지 않은 상품' },
            { value: 'likeNew', label: '사용감 없음', description: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음' },
            { value: 'someWear', label: '사용감 적음', description: '눈에 띄는 흔적이나 얼룩이 약간 있음' },
            { value: 'significantWear', label: '사용감 많음', description: '눈에 띄는 흔적이나 얼룩이 많이 있음' },
          ]}
        />
        <ProductField label="설명" type="textarea" placeholder="상품 설명을 최대한 자세히 적어주세요." height="150px" />
        <ProductField
          label="태그"
          type="textarea"
          textAreaDetail="  - 태그는 띄어쓰기로 구분되며 최대 N자까지 입력할 수 있어요."
          placeholder="(선택) 태그를 입력해주세요."
        />
        <p className="text-left text-3xl mt-28 ">추가 정보</p>
        <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />
        <div className="mb-4">
          <div className="flex items-left">
            <span className="w-48 flex-shrink-0 text-left mr-1">수량</span>
            <input
              className="text-right shadow appearance-none border rounded w-62 md:w-4/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
              type="text"
              placeholder="개 "
            />
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
                placeholder="내 위치"
              />
              <input
                className="shadow appearance-none border rounded w-full md:w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-2 placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                type="text"
                placeholder="서울 강남구"
              />
            </div>
          </div>
          <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
        </div>
        <div className="text-right">
          <CommonButton className=" align-middle w-44 rounded-lg bg-mainBlack px-auto py-3.5 text-lg font-semibold font-didot  text-mainWhite  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-2 border border-solid border-mainWhite focus:bg-mainWhite">
            임시저장
          </CommonButton>
          <CommonButton className=" align-middle w-44 rounded-lg bg-mainWhite px-auto py-3.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-2 border border-solid border-mainWhite focus:bg-mainWhite">
            등록하기
          </CommonButton>
        </div>
      </div>
    </form>
  );
};

export default ProductReg;
