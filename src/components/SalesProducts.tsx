import orderProducts from '@/orderProductData';
import CommonButton from './CommonButton';

const SalesProducts = () => {
  return (
    <ul role="list" className="w-screen divide-y divide-subGray border-b border-t border-subGray ml-20 sm:ml-6">
      {orderProducts.map(product => (
        <li key={product.id} className="flex py-6">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              // alt={product.imageAlt}
              className="h-32 w-32 rounded-md object-cover object-center sm:h-24 sm:w-24"
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col sm:ml-6">
            <div>
              <div className="flex justify-between">
                <h4 className="text-base">
                  <a className="font-medium text-mainWhite">{product.title}</a>
                </h4>
              </div>
              <div className="mt-1 text-sm text-subGray">{product.description}</div>
              <div className="mt-1 text-sm text-subGray">{product.price.toLocaleString()}</div>
            </div>
            <div className="mt-2 flex flex-1 items-start  flex-col">
              <ul role="list" className="space-y-6">
                <li className="relative flex md:flex-col sm:flex-col">
                  <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full ring-1 ring-mainWhite " />
                  </div>
                  <div className="flex md:flex-col sm:flex-col py-0.5 text-sm leading-5 text-mainWhite">
                    <span className="font-medium mr-2">섹시다이너마이트</span>
                    <p>2024.05.10 ~ 2024.05.14</p>
                    <div className="flex items-center gap-1 ml-2 md:ml-0 sm:ml-0 ">
                      <div className="flex-none py-0.5 text-sm leading-5 text-gray">대여중</div>
                      <svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true">
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                    </div>
                  </div>
                </li>
              </ul>
              <CommonButton className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-mainWhite hover:bg-mainWhite hover:text-mainBlack focus:bg-mainWhite focus:text-mainBlack mt-2">
                반납 확정
              </CommonButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SalesProducts;
