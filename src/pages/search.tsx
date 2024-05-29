'use client';
import Products, { product } from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import SearchBar from '@/components/search/SearchBar';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

const Search = () => {
  const [products, setProducts] = useState<product[]>([]); //상품 저장하는 상태
  const [search, setSearch] = useState(false); // 상품을 한번이라도 검색했는지 안했는지 알아보는 상태

  const { willSelectedProductId, setSelectedProductId, setWillSelectedProductId } = useProductIdStore();
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();

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
      <div className="flex flex-col items-center w-2/3 justify-center m-auto mt-10">
        <SearchBar setProducts={setProducts} setSearch={setSearch} />
        {/* 상품을 검색하지않았을 때 */}
        {/* {!search && <p>상품을 검색해주세요</p>} */}
        {/*  상품을 검색했지만, 검색결과가 없을 떄 */}
        {/* {products.length < 1 && <p>검색결과가 없습니다 </p>} */}
        {/* 상품을 검색했고, 검색결과가 있을 때 */}

        <Products products={products} setProducts={setProducts} />
      </div>
    </>
  );
};

export default Search;
