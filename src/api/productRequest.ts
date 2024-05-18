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
