import instance from '@/api/instance';
import MyCloset from '@/components/mypage/MyCloset';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';

import { useEffect, useState } from 'react';

const MyClosetPage = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  useEffect(() => {
    fetchSalesProduct();
  }, []);
  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);
  const fetchSalesProduct = async () => {
    const response = await instance.get('/mypage/products/');
    console.log(response.data);
    setSalesProducts(response.data.results);
    console.log('salesProducts', salesProducts);
  };
  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      <MyCloset salesProducts={salesProducts} />
    </>
  );
};

export default MyClosetPage;
