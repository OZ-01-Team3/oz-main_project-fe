import { PlusIcon } from "@heroicons/react/16/solid"
import { useNavigate } from "react-router-dom"
const ProductRegistrationButton = () => {
  const navigate = useNavigate()
  return (
    <div className="fixed right-10 bottom-10 group cursor-pointer" onClick={() => navigate('/img-reg')}>
      <div className="relative flex justify-center items-center">
        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center transition-transform duration-500 hover:rotate-180">
          {/* Rotate the icon on hover */}
          <PlusIcon className="w-5 h-5 text-mainBlack" />
        </div>
        <div className="absolute bottom-12 w-max px-2 py-1 text-xs text-black bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
          상품 등록하기
        </div>
      </div>
    </div>
  )
}

export default ProductRegistrationButton