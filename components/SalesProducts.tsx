
import products from "@/productData"


const SalesProducts = () => {
  return (
    <ul role="list" className="w-screen divide-y divide-subGray border-b border-t border-subGray ml-20 sm:ml-6">
      {products.map((product) => (
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
                  <a className="font-medium text-mainWhite">
                    {product.title}
                  </a>
                </h4>

              </div>
              <div className="mt-1 text-sm text-subGray">
                {product.description}</div>
              <div className="mt-1 text-sm text-subGray">

                {product.price.toLocaleString()}</div>
            </div>


          </div>
        </li>
      ))}
    </ul>
  )
}

export default SalesProducts