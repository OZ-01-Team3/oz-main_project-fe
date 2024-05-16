'use client';
import Banner from '@/components/Banner';
import EventBanner from '@/components/EventBanner';
import Footer from '@/components/Footer';
import PageNation from '@/components/PageNation';
import ProductDetailModal from '@/components/ProductDetail/ProductDetailModal';
import Products from '@/components/Products';
const category = ['전체', '아우터', '상의', '하의', '잡화', '신발'];
const sort = ['전체', '대여많은순', '최신순', '가격낮은순', '가격높은순'];
const TotalProducts = () => {
  return (
    <>
      <ProductDetailModal />
      <Banner />
      {/* 페이지 레이아웃 */}
      <div className="pt-32 w-2/3 ml-auto mr-auto ">
        {/* 상품 카테고리 select박스 */}
        <select className="bg-transparent rounded-xl mr-5 ">
          {category.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        {/* 상품 정렬 select박스 */}
        <select className="bg-transparent rounded-xl ">
          {sort.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
        <h1 className="text-4xl mb-20 font-didot text-center">ALL</h1>
        <Products setDetailModalOpen={setDetailModalOpen} />
        <EventBanner />
        <Products setDetailModalOpen={setDetailModalOpen} />
        <Products setDetailModalOpen={setDetailModalOpen} />
        {/* 페이지네이션 */}
        <PageNation />
      </div>
      <Footer />
    </>
  );
};

export default TotalProducts;
