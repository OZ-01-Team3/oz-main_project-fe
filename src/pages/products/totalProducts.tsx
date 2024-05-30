import instance from '@/api/instance';
import { productRequests } from '@/api/productRequest';
import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import PageNation from '@/components/PageNation';
import Products, { product } from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useCurrentPageStore, useTotalPageStore } from '@/stores/usePageStore';
import useStyleTagStore from '@/stores/useStyleTagStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

const sorts = [
  { id: 1, text: '최신순', value: '-created_at' },
  { id: 2, text: '오래된 순', value: 'created_at' },
  { id: 3, text: '가격낮은순', value: 'rental_fee' },
  { id: 4, text: '가격높은순', value: '-rental_fee' },
  { id: 5, text: '인기순', value: 'likes' },
  { id: 6, text: '조회수', value: 'views' },
];
interface categories {
  id: number;
  name: string;
}
const TotalProducts = () => {
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOrdered, setSelectedOrdered] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [products, setProducts] = useState<product[]>([]);
  const { setCurrentPage } = useCurrentPageStore();
  const { totalPages, setTotalPages } = useTotalPageStore();
  const { currentPage } = useCurrentPageStore();
  const { styleTag, setStyleTag } = useStyleTagStore();
  const [categories, setCategories] = useState<categories[]>([]);

  useEffect(() => {
    handleGetCategories();
    handleGetStyles();
  }, []);

  // 상품 필터링 조건부로 날리기
  useEffect(() => {
    handleSelectCategory();
  }, [selectedCategory, selectedStyle, selectedOrdered]);

  // 모달 라우팅 용
  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);

  // 스타일 가져오기
  const handleGetStyles = async () => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/categories/styles/`);
      console.log(response, '상품 스타일 가져오기 성공');
      setStyleTag([{ id: 0, name: '전체' }, ...response.data]); //'전체' 추가
    } catch (error) {
      console.log(error);
    }
  };
  // 카테고리 가져오기
  const handleGetCategories = async () => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `/categories/`);
      console.log(response, '상품 카테고리 가져오기 성공');
      setCategories([{ id: 0, name: '전체' }, ...response.data]); //'전체' 추가
    } catch (error) {
      console.log(error);
    }
  };
  // 처음에 전체상품 불러오기
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // 정렬별로 쿼리문 실행
  const handleSelectCategory = async () => {
    try {
      let query = `${productRequests.products}?`;
      if (selectedCategory && selectedCategory !== '0') {
        query += `product_category=${selectedCategory}&`;
      }
      if (selectedStyle && selectedStyle !== '0') {
        query += `styles=${selectedStyle}&`;
      }
      if (selectedOrdered) {
        query += `ordering=${selectedOrdered}&`;
      }
      if (query.endsWith('&')) {
        query = query.slice(0, -1);
      }
      const response = await instance.get(query);
      console.log(`상품정렬성공!`, response.data);
      setProducts(response.data.results);
      console.log('query', query);
    } catch (error) {
      console.log(error);
    }
  };

  // 전체상품 불러오기
  const fetchProducts = async (page: number) => {
    try {
      const response = await axios.get(VITE_BASE_REQUEST_URL + `${productRequests.products}?page=${page}`);
      console.log(page);
      setProducts(response.data.results);
      const totalProducts = response.data.count;
      setTotalPages(Math.ceil(totalProducts / 24));
      console.log(Math.ceil(totalProducts / 24));
    } catch (error) {
      console.error('상품 불러오기 실패:', error);
    }
  };
  // 페이지 네이션
  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <>
      <Banner />
      {detailModalOpen && <ProductDetailModal />}
      {/* 페이지 레이아웃 */}
      <h1 className="text-4xl mb-14 mt-14 font-didot text-center">ALL</h1>
      <div className="w-2/3 ml-auto mr-auto ">
        {/* 상품 카테고리 select박스 */}
        <div className="mb-16">
          <select
            className="bg-transparent rounded-xl mr-5 "
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            {categories.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* 상품 스타일태그 select박스 */}
          <select
            className="bg-transparent rounded-xl mr-5 "
            value={selectedStyle}
            onChange={e => setSelectedStyle(e.target.value)}
          >
            {styleTag.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* 상품 정렬 select박스 */}
          <select
            className="bg-transparent rounded-xl"
            value={selectedOrdered}
            onChange={e => setSelectedOrdered(e.target.value)}
          >
            {sorts.map(item => (
              <option key={item.id} value={item.value}>
                {item.text}
              </option>
            ))}
          </select>
        </div>

        {/* {products.length < 1 && <p className="text-center">해당 상품이 없습니다 </p>} */}
        <Products products={products} setProducts={setProducts} />
        <EventBanner />
        {/* 페이지네이션 */}
        <PageNation handlePageChange={handlePageChange} />
      </div>
      <Footer />
    </>
  );
};

export default TotalProducts;
