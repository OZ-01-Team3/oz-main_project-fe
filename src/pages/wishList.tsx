'use client';
import Footer from '@/components/Footer';
import ProductDetailModal from '@/components/ProductDetail/ProductDetailModal';
import Products from '@/components/Products';

const WishList = () => {
  return (
    <>
      <ProductDetailModal />
      <div className="pt-20 w-2/3 ml-auto mr-auto ">
        <h1 className="text-4xl mb-20 font-didot text-center">Wish List</h1>
        <Products />
      </div>
      <Footer />
    </>
  );
};

export default WishList;
