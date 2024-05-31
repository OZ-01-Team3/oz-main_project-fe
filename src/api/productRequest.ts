import instance from './instance';

export const productRequests = {
  categories: '/categories/', //카테고리 조회
  products: '/products/', //상품등록,상품조회
};
//상품등록
export const CreateProductAPI = (data: FormData) =>
  instance.post<UserActivation>(productRequests.products, {
    data,
  });

// 상품 목록 조회 - 페이지네이션
export const fetchProducts = async (page: number) => {
  try {
    const response = await instance.get(`${productRequests.products}?page=${page}`);
    // console.log('상품 불러오기 성공!', response);
    return response.data;
  } catch (error) {
    console.error('상품 불러오기 실패', error);
    throw error;
  }
};

//상품 조회
export const productDetailListAPI = () => {
  return instance.get(productRequests.products);
};
