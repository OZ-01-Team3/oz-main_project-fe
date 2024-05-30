import instance from '@/api/instance';
import MyCloset from '@/components/mypage/MyCloset';

import { useEffect, useState } from 'react';

const MyClosetPage = () => {
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
      <MyCloset salesProducts={salesProducts} />
    </>
  );
};

export default MyClosetPage;
