import { product } from '../Products';
interface SalesProductsProps {
  salesProducts: product[];
}
const MyCloset = ({ salesProducts }: SalesProductsProps) => {
  return (
    <ul
      role="list"
      className=" divide-y divide-subGray border-t border-subGray flex items-center justify-start ml-4 flex-col w-full "
    >
      {salesProducts.map(product => (
        <li key={product.uuid} className="flex py-6  items-center w-full ">
          <div className="flex-shrink-0">
            <img
              src={product.images[0].image}
              // alt={product.imageAlt}
              className="h-24 w-24 rounded-md object-cover object-center sm:h-24 sm:w-24"
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
                {product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product?.description}{' '}
              </div>
              <div className="mt-1 text-sm ">대여비: {product.rental_fee?.toLocaleString()}원</div>
            </div>
            <div className="mt-2 flex flex-1 items-start  flex-col sm:hidden ">
              <ul role="list" className="space-y-6">
                <li className="relative flex md:flex-col sm:flex-col">
                  <div className="flex items-center gap-1 ml-2 md:ml-0 sm:ml-0 ">{/* 대여중 */}</div>
                </li>
              </ul>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyCloset;
