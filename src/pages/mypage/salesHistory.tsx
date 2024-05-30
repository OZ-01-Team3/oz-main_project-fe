import instance from '@/api/instance';
import { convertDatetime, rentalHistory } from '@/components/mypage/OrderRentalHistorys';
import ProductDetailModal from '@/components/productDetail/ProductDetailModal';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { useEffect, useState } from 'react';

const SalesHistory = () => {
  const [salesHistorys, setSalesHistorys] = useState<rentalHistory[]>([]);
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
    const response = await instance.get('/products/rental_history/lending');
    // console.log(response.data);
    setSalesHistorys(response.data);
  };

  const returnProduct = async (historyId: number, e) => {
    e.stopPropagation();
    try {
      const response = await instance.patch(`/products/rental_history/${historyId}/`, { status: 'RETURNED' });
      // console.log('반납 성공', response.data);
      setSalesHistorys(prevHistorys =>
        prevHistorys.map(history => (history.id === historyId ? { ...history, ...response.data } : history))
      );
    } catch (error) {
      console.error('반납 실패', error);
    }
  };

  useEffect(() => {
    fetchSalesProduct();
  }, []);
  useEffect(() => { }, [salesHistorys]);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      {salesHistorys.length === 0 ? (
        <div className="w-full flex justify-center ">
          <p>대여중인 상품이 없습니다.</p>
        </div>
      ) : (
        <ul
          role="list"
          className=" divide-y divide-subGray border-y border-subGray flex items-center justify-start ml-4 flex-col w-full "
        >
          {salesHistorys.map(history => (
            <li
              key={history.product_info.uuid}
              className="flex py-6  items-center w-full "
              onClick={() => handleOpenModal(history.product_info.uuid)}
            >
              <div className="flex-shrink-0">
                <img
                  src={history.product_info.images[0].image}
                  // alt={product.imageAlt}
                  className="h-32 w-32 rounded-md object-cover object-center sm:h-24 sm:w-24"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div className="flex justify-between">
                    <h4 className="text-base">
                      <a className="font-medium text-mainWhite">{history.product_info.name}</a>
                    </h4>
                  </div>

                  <div className="mt-1 text-sm font-light sm:hidden md:hidden">
                    {history.product_info.description.length > 60
                      ? `${history.product_info.description.substring(0, 60)}...`
                      : history.product_info?.description}{' '}
                  </div>
                  <div className="mt-1 text-sm ">대여비: {history.product_info.rental_fee?.toLocaleString()}원</div>
                </div>
                <div className="mt-2 flex flex-1 items-start  flex-col sm:hidden ">
                  <ul role="list" className="space-y-6">
                    <li className="relative flex md:flex-col sm:flex-col">
                      <div className="flex sm:flex-col py-0.5 text-sm leading-5 text-mainWhite items-center">
                        <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full ring-1 ring-mainWhite " />
                        </div>
                        <span className="font-medium mr-2">{history.borrower_nickname}</span>
                        <p className="md:hidden">
                          {convertDatetime(history.rental_date)} ~ {convertDatetime(history.return_date)}
                        </p>
                        <div className="flex items-center gap-1 ml-2 md:ml-0 sm:ml-0 ">
                          {/* 대여중 */}
                          <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                            <circle cx={3} cy={3} r={3} />
                          </svg>
                          <div className="flex-none py-0.5 text-sm leading-5 text-customGray">{history.status}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <button
                  className="rounded-full w-20 disabled:hidden bg-gray-50 py-1 text-xs font-medium ring-1 ring-inset ring-mainWhite hover:bg-mainWhite text-mainBlack focus:bg-mainWhite focus:text-mainBlack"
                  onClick={e => returnProduct(history.id, e)}
                  disabled={history.status === '반납 완료'}
                >
                  반납 확정
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
export default SalesHistory;
