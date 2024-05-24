'use client';
import instance from '@/api/instance';
import { productRequests } from '@/api/productRequest';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import PageNation from '@/components/PageNation';
import Products, { product } from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useCurrentPageStore, useTotalPageStore } from '@/stores/usePageStore';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
const category = [
  { id: 1, name: '상의' },
  { id: 2, name: '하의' },
  { id: 3, name: '신발' },
  { id: 4, name: '아우터' },
  { id: 5, name: '잡화' },
];

const sorts = [
  { id: 1, text: '최신순', value: '-created_at' },
  { id: 2, text: '오래된 순', value: 'created_at' },
  { id: 3, text: '가격낮은순', value: 'rental_fee' },
  { id: 4, text: '가격높은순', value: '-rental_fee' },
  { id: 4, text: '인기순', value: 'views' },
];

const TotalProducts = () => {
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedOrdered, setSelectedOrdered] = useState('created_at');
  const [products, setProducts] = useState<product[]>([]);
  const { setCurrentPage } = useCurrentPageStore();
  const { totalPages, setTotalPages } = useTotalPageStore();
  const { currentPage } = useCurrentPageStore();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // 상품 카테고리 필터링(상의,하의,등등)
  useEffect(() => {
    handleSelectCategory();
  }, [selectedCategory]);
  const handleSelectCategory = async () => {
    try {
      const response = await instance.get(`${productRequests.products}?product_category=${selectedCategory}`);
      console.log(`상품카테고리!${selectedCategory}`, response.data);
      setProducts(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // 상품정렬(최신순,인기순 등등)
  useEffect(() => {
    handleSelectedOrdering();
  }, [selectedOrdered]);

  const handleSelectedOrdering = async () => {
    try {
      const response = await instance.get(`${productRequests.products}?ordering=${selectedOrdered}`);
      console.log(`상품정렬 성공!${selectedOrdered}`, response.data);
      setProducts(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchProducts = async (page: number) => {
      try {
        const response = await axios.get(VITE_BASE_REQUEST_URL + `${productRequests.products}?page=${page}`);
        console.log(response.data);
        console.log(page);
        const updatedProducts = response.data.results.map((item: product) => ({
          ...item,
          isFavorite: false,
        }));
        setProducts(updatedProducts);
        const totalProducts = response.data.count;
        setTotalPages(Math.ceil(totalProducts / 24));
        console.log(Math.ceil(totalProducts / 24));
      } catch (error) {
        console.error('상품 불러오기 실패:', error);
      }
    };
    fetchProducts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      {/* 페이지 레이아웃 */}
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
        {/* 상품 카테고리 select박스 */}
        <select
          className="bg-transparent rounded-xl mr-5 "
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          {category.map(item => (
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
        <h1 className="text-4xl mb-20 mt-12 font-didot text-center">ALL</h1>
        {products.length < 1 && <p className="text-center">해당 상품이 없습니다 </p>}
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
