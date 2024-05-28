import instance from '@/api/instance';
import { product } from '@/components/Products';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

const SalesHistory = () => {
  const [salesProducts, setSalesProducts] = useState<product[]>([]);
  const { detailModalOpen } = useModalOpenStore();
  const { setDetailModalOpen } = useModalOpenStore();
  const { setSelectedProductId, willSelectedProductId, setWillSelectedProductId } = useProductIdStore();

  useEffect(() => {
    localStorage.setItem('pathname', window.location.pathname);
    if (willSelectedProductId) {
      setWillSelectedProductId(null);
      setDetailModalOpen(true);
      setSelectedProductId(willSelectedProductId);
      history.pushState({}, '', `/product/${willSelectedProductId}`);
    }
  }, []);

  const handleOpenModal = (id: string) => {
    setDetailModalOpen(true);
    setSelectedProductId(id);
    history.pushState({}, '', `/product/${id}`);
  };

  const fetchSalesProduct = async () => {
    const response = await instance.get('/mypage/products/');
    console.log(response.data);
    setSalesProducts(response.data.results);
  };

  useEffect(() => {
    fetchSalesProduct();
  }, []);

  console.log('salesProducts', salesProducts);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      <ul
        role="list"
        className=" divide-y divide-subGray border-y border-subGray flex items-center justify-start ml-4 flex-col w-full "
      >
        {salesProducts.map(product => (
          <li
            key={product.uuid}
            className="flex py-6  items-center w-full "
            onClick={() => handleOpenModal(product.uuid)}
          >
            <div className="flex-shrink-0">
              <img
                src={product.images[0].image}
                // alt={product.imageAlt}
                className="h-32 w-32 rounded-md object-cover object-center sm:h-24 sm:w-24"
              />
            </div>
            <div className="ml-4 flex flex-1 flex-col sm:ml-6">
              <div>
                <div className="flex justify-between">
                  <h4 className="text-base">
                    <a className="font-medium text-mainWhite">{product.name}</a>
                  </h4>
                </div>

                <div className="mt-1 text-sm font-light sm:hidden md:hidden">
                  {product.description.length > 60
                    ? `${product.description.substring(0, 60)}...`
                    : product?.description}{' '}
                </div>
                <div className="mt-1 text-sm ">대여비: {product.rental_fee?.toLocaleString()}원</div>
              </div>
              <div className="mt-2 flex flex-1 items-start  flex-col sm:hidden ">
                <ul role="list" className="space-y-6">
                  <li className="relative flex md:flex-col sm:flex-col">
                    <div className="flex sm:flex-col py-0.5 text-sm leading-5 text-mainWhite items-center">
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                        <div className="h-1.5 w-1.5 rounded-full ring-1 ring-mainWhite " />
                      </div>
                      <span className="font-medium mr-2">섹시다이너마이트</span>
                      <p className="md:hidden">2024.05.10 ~ 2024.05.14</p>
                      <div className="flex items-center gap-1 ml-2 md:ml-0 sm:ml-0 ">
                        {/* 대여중 */}
                        <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                          <circle cx={3} cy={3} r={3} />
                        </svg>
                        <div className="flex-none py-0.5 text-sm leading-5 text-customGray">대여중</div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button className=" rounded-full w-20 bg-gray-50 py-1 text-xs font-medium ring-1 ring-inset ring-mainWhite hover:bg-mainWhite text-mainBlack focus:bg-mainWhite focus:text-mainBlack  ">
                반납 확정
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SalesHistory;
