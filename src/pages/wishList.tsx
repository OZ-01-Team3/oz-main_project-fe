import instance from '@/api/instance';
import Footer from '@/components/Footer';
import Products, { product } from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

const WishList = () => {
  const [products, setProducts] = useState<product[]>([]);
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  const { setDetailModalOpen, detailModalOpen } = useModalOpenStore();

  const fetchWishList = async () => {
    const response = await instance.get('/likes/');
    const productDetail = response.data.results;
    setProducts(productDetail.map(product => product.product));
  };
  // 컴포넌트가 처음 마운트될 때 좋아요 목록 가져오기
  useEffect(() => {
    fetchWishList();
  }, []);

  console.log(products);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      <div className="pt-20 w-2/3 ml-auto mr-auto ">
        <h1 className="text-4xl mb-20 font-didot text-center">Wish List</h1>
        <Products products={products} setProducts={setProducts} />
      </div>
      <Footer />
    </>
  );
};

export default WishList;
