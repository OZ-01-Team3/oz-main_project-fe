import instance from '@/api/instance';
import SalesProducts from '@/pages/mypage/SalesProducts';
import { useEffect, useState } from 'react';

const SalesHistory = () => {
  const [salesProducts, setSalesProducts] = useState([]);
  useEffect(() => {
    fetchSalesProduct();
  }, []);
  const fetchSalesProduct = async () => {
    const response = await instance.get('/mypage/products/');
    console.log(response.data);
    setSalesProducts(response.data.results);
    console.log('salesProducts', salesProducts);
  };

  return (
    <>
      <SalesProducts salesProducts={salesProducts} />
    </>
  );
};

export default SalesHistory;
