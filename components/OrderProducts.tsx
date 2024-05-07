import orderProducts from "@/orderProductData"
import { CheckIcon } from "@heroicons/react/16/solid"
import CommonButton from "./CommonButton"


const OrderProducts = () => {
  return (
    <ul role="list" className="w-screen divide-y divide-subGray border-b border-t border-subGray ml-20 ">
      {orderProducts.map((product) => (
        <li key={product.id} className="flex py-6">

          <div className="flex-shrink-0">
            <img
              src={product.image}
              // alt={product.imageAlt}
              className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
            />
          </div>
          <div className="ml-4 flex flex-1 flex-col sm:ml-6">
            <div>
              <div className="flex justify-between">
                <h4 className="text-base">
                  <a className="font-medium text-mainWhite">
                    {product.title}
                  </a>
                </h4>
                <p className="ml-4 text-sm font-medium text-mainWhite">D-13</p>
              </div>
              <div className="mt-1 text-sm text-subGray">
                <span className="text-subGray mr-1 font-medium">대여일</span>{product.rental}</div>
              <div className="mt-1 text-sm text-subGray">
                <span className=" text-subGray mr-1 font-medium">반납일</span>
                {product.return}</div>
            </div>

            <div className="mt-4 flex flex-1 items-end justify-between">
              <CommonButton className="flex items-center space-x-2 text-sm text-mainWhite border p-1.5 rounded-md">
                대여중

                <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              </CommonButton>

            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default OrderProducts