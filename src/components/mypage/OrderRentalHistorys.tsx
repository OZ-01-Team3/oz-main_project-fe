import instance from '@/api/instance';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { CheckIcon } from '@heroicons/react/16/solid';
import { useEffect, useState } from 'react';
import CommonButton from '../CommonButton';
import ProductDetailModal from '../productDetail/ProductDetailModal';

export interface rentalHistory {
  id: number;
  product: string;
  lender_nickname: string;
  borrower_nickname: string;
  rental_date: string;
  return_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  product_info: productInfo;
}
interface productInfo {
  uuid: string;
  name: string;
  brand: string;
  size: string;
  rental_fee: number;
  category: string;
  style: string[];
  images: image[];
  description: string;
}

interface image {
  image: string;
}

export const convertDatetime = (created_at: string) => {
  const datetime = new Date(created_at);
  console.log(datetime);
  const year = datetime.getFullYear();
  const month = String(datetime.getMonth() + 1).padStart(2, '0');
  const day = String(datetime.getDate()).padStart(2, '0');
  const hour = String(datetime.getHours()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}시`;
};

const OrderRentalHistorys = () => {
  const [rentalHistorys, setRentalHistorys] = useState<rentalHistory[]>([]);
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
    const response = await instance.get('/products/rental_history/borrow');
    console.log('응답으로 들어온 데이터 : ', response.data);
    setRentalHistorys(response.data);
  };

  useEffect(() => {
    fetchSalesProduct();
  }, []);

  console.log('rentalHistorys', rentalHistorys);

  return (
    <>
      {detailModalOpen && <ProductDetailModal />}
      {rentalHistorys.length === 0 ? (
        <div className="w-full flex justify-center ">
          <p>주문이력이 없습니다</p>
        </div>
      ) : (
        <ul
          role="list"
          className=" divide-y divide-subGray border-y border-subGray flex items-center justify-start ml-4 flex-col w-full"
        >
          {rentalHistorys.map(history => (
            <li
              key={history.product_info.uuid}
              className="flex py-3  items-center w-full"
              onClick={() => handleOpenModal(history.product_info.uuid)}
            >
              <div className="flex-shrink-0">
                <img
                  src={history.product_info.images[0].image}
                  // alt={product.imageAlt}
                  className="h-32 w-32 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div className="flex justify-between">
                    <h4 className="text-base">
                      <a className="font-medium text-mainWhite">{history.product_info.name}</a>
                    </h4>
                    <p className="ml-4 text-sm font-medium text-mainWhite">D-13</p>
                  </div>
                  <div className="mt-1 text-sm text-subGray">
                    <span className="text-subGray mr-1 font-medium">대여일</span>
                    {convertDatetime(history.rental_date)}
                  </div>
                  <div className="mt-1 text-sm text-subGray">
                    <span className=" text-subGray mr-1 font-medium">반납일</span>
                    {convertDatetime(history.return_date)}
                  </div>
                </div>

                <div className="mt-4 flex flex-1 items-end justify-between">
                  <CommonButton className="flex items-center space-x-2 text-sm text-mainWhite border p-1.5 rounded-md">
                    {history.status}
                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                  </CommonButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OrderRentalHistorys;
