import instance from '@/api/instance';
import { productRequests } from '@/api/productRequest';
import CommonButton from '@/components/CommonButton';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z as zod } from 'zod';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
const sizes = ['S', 'M', 'L', 'XL'];
const cookies = new Cookies();
export const productStatusOptions = [
  { id: 1, label: '새 상품 (미사용)', description: '사용하지 않은 상품' },
  { id: 2, label: '사용감 없음', description: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음' },
  { id: 3, label: '사용감 적음', description: '눈에 띄는 흔적이나 얼룩이 약간 있음' },
  { id: 4, label: '사용감 많음', description: '눈에 띄는 흔적이나 얼룩이 많이 있음' },
];

interface locationState {
  file: File;
  id: number;
  imageUrl: string;
}

interface category {
  id: number;
  name: string;
}

const productRegistrationSchema = zod.object({
  name: zod.string().min(1, '상품명을 입력해주세요').max(30, '상품명은 30자 이내로 입력해주세요'),
  purchase_price: zod.coerce.number().min(1, '1원 이상 입력해주세요'),
  rental_fee: zod.coerce.number().min(1, '1원 이상 입력해주세요'),
  size: zod.string().min(1, '사이즈를 선택해주세요'),
  brand: zod.string().min(1, '브랜드를 입력해주세요'),
  product_category: zod.coerce.number().min(1, '카테고리를 선택해주세요'),
  purchase_date: zod.string().min(1, '구매시기를 선택해주세요'),
  condition: zod.string().min(1, '상품 상태를 선택해주세요'),
  description: zod.string().min(1, '상품 설명을 입력해주세요'),
  amount: zod.coerce.number().min(1, '수량을 입력해주세요'),
  region: zod.string().min(1, '거래지역을 입력해주세요'),
});

const ProductRegistration = () => {
  const [productNameLength, setProductNameLength] = useState<number>(0);
  const [categories, setCategories] = useState<category[]>([]);

  // img-reg 에서 보낸 사진 배열 받아오기
  const location = useLocation();
  const navigate = useNavigate();

  // 이미지 등록안한상태로 url로 접송했을 때 틩기도록
  useEffect(() => {
    if (location.state === null) {
      navigate('/img-reg');
      toast.error('사진을 등록해주세요!');
      return;
    }
    handleGetCategories();
  }, []);

  //**받아온 사진 배열에서 사진파일배열만 보내기 */
  const registeredImages = (location.state as locationState[]).map(item => {
    return item.file;
  });
  console.log(registeredImages);

  const handleProductNameMaxLength: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    if (value.length <= 30) {
      setProductNameLength(value.length);
    } else {
      e.target.value = value.slice(0, 30);
      setProductNameLength(30);
    }
  };
  // 숫자입력시 자동으로 toLocaleString 적용

  //상품등록 폼 상태 관리
  const form = useForm({
    resolver: zodResolver(productRegistrationSchema),
    defaultValues: {
      name: '',
      purchase_price: '',
      rental_fee: '',
      size: '',
      brand: '',
      product_category: '',
      purchase_date: '',
      condition: '',
      description: '',
      // tag: '',
      amount: '',
      region: '',
      image: '',
    },
    mode: 'onSubmit',
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const handleGetCategories = async () => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/categories/`);
      console.log(response, '상품 카테고리 가져오기 성공');
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickReg = form.handleSubmit(async data => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('purchase_price', data.purchase_price);
      formData.append('rental_fee', data.rental_fee);
      formData.append('size', data.size);
      formData.append('brand', data.brand);
      formData.append('product_category', data.product_category);
      formData.append('purchase_date', data.purchase_date);
      formData.append('condition', data.condition);
      formData.append('description', data.description);
      formData.append('amount', data.amount);
      formData.append('region', data.region);

      // registeredImages 파일을 formData에 추가
      registeredImages.forEach(image => {
        formData.append(`image`, image);
        console.log(image);
      });

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const access = cookies.get('ac');
      const response = await instance.post(VITE_BASE_REQUEST_URL + productRequests.products, formData);
      console.log('상품 등록 성공', response);
      toast.success('상품이 성공적으로 등록되었습니다!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('상품등록에 실패하였습니다');
    }
    console.log(data);
  });
  return (
    <div className="lg:w-[700px] w-[900px] md:w-[500px] sm:w-[350px] sm:text-sm m-auto ">
      <FormProvider {...form}>
        <form className="w-full md:mb-20 sm:mb-20" onSubmit={handleClickReg}>
          <p className="text-left text-3xl mt-28">상품 정보</p>
          <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />
          {/* 상품명 */}
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품명</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <div className="w-full flex justify-between items-center relative">
                  <input
                    type="text"
                    className="pr-2 shadow appearance-none border rounded w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    placeholder="상품명을 입력하세요"
                    {...register('name')}
                    onChange={handleProductNameMaxLength}
                  />
                  <span className="text-sm ml-3 text-mainBlack absolute z-10 right-2">{productNameLength}/30</span>
                </div>
                {errors.name && <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.name.message}</p>}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 구매가 */}
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">구매가</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <div className="w-full flex justify-between items-center relative ">
                  <input
                    type="number"
                    className="pr-6 shadow appearance-none border rounded w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    placeholder="상품을 구매하신 금액을 입력하세요"
                    {...register('purchase_price')}
                  />
                  <span className="text-sm text-mainBlack ml-3 absolute right-2">원</span>
                </div>
                {errors.purchase_price && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.purchase_price.message}</p>
                )}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 대여비 */}
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center w-full ">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5 ">대여비</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <div className="w-full flex justify-between items-center relative ">
                  <input
                    type="number"
                    className="pr-6 shadow appearance-none border rounded w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                    placeholder="대여비를 입력하세요"
                    {...register('rental_fee')}
                  />
                  <span className="text-sm text-mainBlack ml-3 absolute right-2">원</span>
                </div>
                {errors.rental_fee && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.rental_fee.message}</p>
                )}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 사이즈 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">사이즈</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <select
                  className="shadow appearance-none border rounded w-full  py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline focus:border-mainWhite focus:bg-mainWhite"
                  {...register('size')}
                >
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {errors.size && <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.size.message}</p>}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 브랜드 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">브랜드</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="브랜드"
                  {...register('brand')}
                />
                {errors.brand && <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.brand.message}</p>}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 카테고리 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">카테고리</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <select
                  className="shadow appearance-none border rounded w-full  py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline focus:border-mainWhite focus:bg-mainWhite"
                  {...register('product_category')}
                >
                  {categories &&
                    categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                {errors.product_category && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.product_category.message}</p>
                )}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 구매시기 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">구매시기</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full  py-2 px-4 text-mainBlack leading-tight focus:outline-none focus:shadow-outline"
                  {...register('purchase_date')}
                />
                {errors.purchase_date && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.purchase_date.message}</p>
                )}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 상품 상태 */}
          <div className="flex items-center justify-center w-full">
            <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품 상태</span>
            <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
              <div className="flex w-full flex-col ">
                {productStatusOptions.map(option => (
                  <div className="flex justify-between w-full " key={option.id}>
                    <label className="w-1/3 md:text-sm md:w-1/2 sm:w-1/2">
                      <input
                        type="radio"
                        {...register('condition')}
                        id={String(option.id)}
                        name="condition"
                        className="focus:border-mainWhite focus:bg-mainWhite mr-5 "
                        value={option.id}
                      />
                      {option.label}
                    </label>
                    <span className="text-sm text-subGray  text-left w-2/3   md:w-1/2 sm:w-1/2">
                      {option.description}
                    </span>
                  </div>
                ))}
                {errors.condition && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.condition.message}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          {/* 설명 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">설명</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  className="shadow appearance-none border rounded w-full  py-3 px-3 h-[150px]  text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="상품 설명을 최대한 자세히 적어주세요."
                  {...register('description')}
                />
                {errors.description && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.description.message}</p>
                )}
              </div>
            </div>
            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
          </div>
          {/* 태그 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">
                태그 <span className="text-subGray">(선택)</span>
              </span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full  px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="ex) 긱시크 (최대 5개) "
                // {...register('tag')}
                />
                {/* {errors.description && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.description.message}</p>
                )} */}
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <p className="text-left text-3xl mt-28">추가 정보</p>
          <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />

          {/* 수량 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">수량</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  type="number"
                  className="shadow appearance-none border rounded w-full px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="ex) 5 "
                  {...register('amount')}
                />
                {errors.amount && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.amount.message}</p>
                )}
              </div>
            </div>
          </div>
          {/* 거래지역 */}
          <div className="mb-4">
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">거래지역</span>
              <div className=" w-full md:w-8/12 flex flex-col justify-start items-center">
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="ex) 서울시 강남구 "
                  {...register('region')}
                />
                {errors.region && (
                  <p className=" text-sm text-red-500 mt-1 w-full text-left">{errors.region.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right md:mb-48 ">
            <CommonButton
              type="submit"
              className="align-middle w-44 rounded-lg bg-mainWhite px-auto py-3.5  font-semibold  text-mainBlack  my-10 "
            >
              등록하기
            </CommonButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductRegistration;
