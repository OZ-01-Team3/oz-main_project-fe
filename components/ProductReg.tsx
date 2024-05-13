'use client';
import CommonButton from '@/components/CommonButton';
import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

const ProductReg = () => {
  const form = useForm({
    defaultValues: {
      productName: '',
      rentalFee: '',
      size: '',
      category: '',
      purchaseDate: '',
      productStatus: '',
      description: '',
      tag: '',
      amount: '',
      region: '',
      brand: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const handleClickReg = handleSubmit(async data => {
    try {
      const response = await axios.post('/api/v1/products', data);
      console.log(response, '상품 등록 성공');
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <form className="w-full" onSubmit={handleClickReg}>
        <p className="text-left text-3xl mt-28">상품 정보</p>
        <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />

        {/* Input fields */}
        <div>
          {/* 상품명 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품명</span>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                placeholder="상품명을 입력하세요"
                {...register('productName')}
              />
              {/* <span className="text-sm text-white ml-3">10/45</span> */}
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 대여비 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">대여비</span>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                placeholder="대여비를 입력하세요"
                {...register('rentalFee')}
              />
              {/* <span className="text-sm text-white ml-3">원</span> */}
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 사이즈 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">사이즈</span>
              <select
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-1 focus:border-mainWhite focus:bg-mainWhite"
                {...register('size')}
              >
                <option value="">S,M,L</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 브랜드 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">브랜드</span>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                placeholder="브랜드"
                {...register('brand')}
              />
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 카테고리 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">카테고리</span>
              <select
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline mt-1 focus:border-mainWhite focus:bg-mainWhite"
                {...register('category')}
              >
                <option value="">전체</option>
                <option value="아우터">아우터</option>
                <option value="상의">상의</option>
                <option value="하의">하의</option>
                <option value="잡화">잡화</option>
                <option value="신발">신발</option>
              </select>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 구매시기 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">구매시기</span>
              <input
                type="date"
                className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-4 text-mainBlack leading-tight focus:outline-none focus:shadow-outline"
                {...register('purchaseDate')}
              />
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 상품 상태 */}
          <div className="flex items-center justify-center w-full">
            <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품 상태</span>
            <div className="flex w-3/4 items-start flex-col">
              <div className="flex items-center">
                <input
                  type="radio"
                  {...register('productStatus')}
                  id="1"
                  name="pro"
                  className="focus:border-mainWhite focus:bg-mainWhite mr-5"
                />
                <label htmlFor="pro1">새 상품 (미사용)</label>
                <span className="text-sm text-subGray ml-7 text-right"> 사용하지 않은 상품</span>
              </div>

              <div className="flex items-center">
                <input type="radio" id="2" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5" />
                <label htmlFor="pro2">사용감 없음</label>
                <span className="text-sm text-subGray ml-7 text-right">
                  사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음
                </span>
              </div>

              <div className="flex items-center">
                <input type="radio" id="3" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5" />
                <label htmlFor="pro3">사용감 적음</label>
                <span className="text-sm text-subGray ml-7 text-right"> 눈에 띄는 흔적이나 얼룩이 약간 있음</span>
              </div>

              <div className="flex items-center">
                <input type="radio" id="4" name="pro" className="focus:border-mainWhite focus:bg-mainWhite mr-5" />
                <label htmlFor="pro4">사용감 많음</label>
                <span className="text-sm text-subGray ml-7 text-right"> 눈에 띄는 흔적이나 얼룩이 많이 있음</span>
              </div>
            </div>
          </div>

          <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          {/* 설명 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">설명</span>
              <input
                className="shadow appearance-none border rounded w-full md:w-8/12 py-3 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                placeholder="상품 설명을 최대한 자세히 적어주세요."
                style={{ height: '150px' }}
                {...register('description')}
              />
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 태그 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">
                태그 <span className="text-subGray">(선택)</span>
              </span>
              <div className="flex flex-col w-full">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="태그를 입력해주세요. (최대 5개)"
                  {...register('tag')}
                />
                <div className="mt-2 text-left text-sm text-subGray">
                  - 태그는 띄어쓰기로 구분되며 최대 N자까지 입력할 수 있어요.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 정보 */}
        <p className="text-left text-3xl mt-28">추가 정보</p>
        <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />

        {/* 수량 */}
        <div className="mb-4">
          <div className="flex items-center justify-start w-full">
            <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">수량</span>
            <input
              type="number"
              className=" shadow appearance-none border rounded w-62 md:w-4/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
              {...register('amount')}
            />
            <span className="text-sm text-white ml-3">개</span>
          </div>
        </div>
        {/* 거래지역 */}
        <div className="mb-4">
          <div className="flex items-center justify-start w-full">
            <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">거래지역</span>
            <input
              type="text"
              className="shadow appearance-none border rounded w-62 md:w-4/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
              placeholder="ex) 서울 강남구"
              {...register('region')}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <CommonButton
            type="submit"
            className="align-middle w-44 rounded-lg bg-mainWhite px-auto py-3.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-2 border border-solid border-mainWhite focus:bg-mainWhite"
          >
            등록하기
          </CommonButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductReg;
