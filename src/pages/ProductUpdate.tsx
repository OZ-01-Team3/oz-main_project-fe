import instance from '@/api/instance';
import CommonButton from '@/components/CommonButton';
import axios from 'axios';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productStatusOptions } from './mypage/productRegistration';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
const sizes = ['S', 'M', 'L', 'XL'];
// const hardCategories = ['전체', '아우터', '상의', '하의', '잡화', '신발'];
// const setCategories = [0, 1, 2, 3, 4, 5];
// interface locationState {
//   file: File;
//   id: number;
//   imageUrl: string;
// }

interface category {
  id: number;
  name: string;
}
const ProductUpdate = () => {
  const [productNameLength, setProductNameLength] = useState<number>(0);
  const [categories, setCategories] = useState<category[]>([]);

  // img-reg 에서 보낸 정보 가져오기
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

  const prevProductInformation = location.state;
  console.log(prevProductInformation);

  //**받아온 사진 배열에서 사진파일배열만 보내기 */
  //   const registeredImages = (location.state as locationState[]).map((item, idx) => {
  //     console.log(`index: ${idx}`);
  //     console.log(item.file);
  //     return item.file;
  //   });
  //   console.log(registeredImages);
  const handleProductNameMaxLength: ChangeEventHandler<HTMLInputElement> = e => {
    const value = e.target.value;
    if (value.length <= 30) {
      setProductNameLength(value.length);
    } else {
      e.target.value = value.slice(0, 30);
      setProductNameLength(30);
    }
  };

  //상품등록 폼 상태 관리
  const form = useForm({
    // resolver: zodResolver(productRegistrationSchema),
    defaultValues: {
      name: prevProductInformation.name,
      purchase_price: prevProductInformation.purchase_price,
      rental_fee: prevProductInformation.rental_fee,
      size: prevProductInformation.size,
      brand: prevProductInformation.brand,
      product_category: prevProductInformation.product_category,
      purchase_date: prevProductInformation.purchase_date,
      condition: prevProductInformation.condition,
      description: prevProductInformation.description,
      // tag: prevProductInformation.,
      amount: prevProductInformation.amount,
      region: prevProductInformation.region,
      images: prevProductInformation.images,
    },
    mode: 'onChange',
  });
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = form;

  const handleGetCategories = async () => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/categories/`);
      console.log(response, '상품 카테고리 가져오기 성공');
      console.log(response.data.results);
      setCategories(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateProduct = handleSubmit(async data => {
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
      formData.append('images', data.images);

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const response = await instance.put(`/products/${prevProductInformation.id}`, formData);
      console.log(response);
      toast.success('상품정보가 수정되었습니다.');
    } catch (error) {
      console.log(error);
      toast.error('상품정보 수정에 실패했습니다.');
    }
    console.log(data);
  });

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('상품을 삭제하시겠습니까? 다시 되돌릴 수 없습니다.')) {
      return;
    }
    try {
      const response = await instance.delete(`/products/${id}`);
      console.log(response);
      toast.success('상품이 성공적으로 삭제되었습니다.');
      navigate('/img-reg'); // 상품 삭제 후 이미지 등록 페이지로 이동
    } catch (error) {
      console.log(error);
      toast.error('상품 삭제에 실패했습니다.');
    }
  };
  return (
    <div className="lg:w-[700px] w-[900px] md:w-[500px] sm:w-[350px] sm:text-sm m-auto">
      <FormProvider {...form}>
        <form className="w-full md:mb-20 sm:mb-20" onSubmit={handleUpdateProduct}>
          <p className="text-left text-3xl mt-28">상품 정보</p>
          <hr className="w-full ml-auto mr-auto mt-6 mb-7 text-hrGray" />
          <div>
            {/* 상품명 */}
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품명</span>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="상품명을 입력하세요"
                  {...register('name')}
                  onChange={handleProductNameMaxLength}
                />
                <span className="text-sm text-white ml-3">{productNameLength}/30</span>
              </div>
              <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
            </div>
            {/* 구매가 */}
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">구매가</span>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="상품을 구매하신 금액을 입력하세요"
                  {...register('purchase_price')}
                />
                <span className="text-sm text-white ml-3">원</span>
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
                  {...register('rental_fee')}
                />
                <span className="text-sm text-white ml-3">원</span>
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
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
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
                  {...register('product_category')}
                >
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    ))}
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
                  {...register('purchase_date')}
                />
              </div>
              <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
            </div>
            {/* 상품 상태 */}
            <div className="flex items-center justify-center w-full">
              <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">상품 상태</span>
              <div className="flex w-3/4 items-start flex-col">
                {productStatusOptions.map(option => (
                  <div className="flex items-center" key={option.id}>
                    <input
                      type="radio"
                      {...register('condition')}
                      id={String(option.id)}
                      name="productStatus"
                      className="focus:border-mainWhite focus:bg-mainWhite mr-5 "
                      value={option.id}
                      defaultChecked={true}
                    />
                    <label htmlFor={`pro${option.id}`}>{option.label}</label>
                    <span className="text-sm text-subGray ml-7 text-right">{option.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <hr className="w-full ml-auto mr-auto mt-5 mb-5 border-stone-800" />
            {/* 설명 */}
            <div className="mb-4">
              <div className="flex items-center justify-center w-full">
                <span className="w-1/4 text-left flex-shrink-0 mr-1 pl-5">설명</span>
                <input
                  className="shadow appearance-none border rounded w-full md:w-8/12 py-3 px-3 h-[150px]  text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="상품 설명을 최대한 자세히 적어주세요."
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
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full md:w-8/12 py-3 px-3 text-mainBlack leading-tight focus:outline-none focus:shadow-outline placeholder-subGray focus:border-mainWhite focus:bg-mainWhite"
                  placeholder="ex) 긱시크 (최대 5개) "
                  // {...register('tag')}
                />
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
          <div className="flex w-full justify-between items-center">
            <CommonButton
              type="button"
              onClick={() => handleDeleteProduct(prevProductInformation.id)}
              className="align-middle w-44 sm:w-32  rounded-lg bg-gray px-auto py-3.5  font-semibold  text-mainBlack  my-10 hover:scale-105"
            >
              삭제하기
            </CommonButton>
            <CommonButton className="align-middle w-44 sm:w-32 rounded-lg bg-mainWhite px-auto py-3.5  font-semibold  text-mainBlack  my-10 hover:scale-105">
              저장하기
            </CommonButton>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductUpdate;
