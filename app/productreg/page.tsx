
import ProductReg from '@/components/ProductReg';
import CommonButton from "@/components/CommonButton";


const productReg = () => {


      return (
        <form>
        <div className='text-center'>
          <h1>상품 상세 등록</h1>

         
          <ProductReg />


          <div className='text-center'>
          <CommonButton className=" w-80 rounded-lg bg-mainBlack px-3.5 py-2.5 text-lg font-semibold font-didot  text-mainWhite  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 border border-solid border-mainWhite">임시저장</CommonButton>
          <CommonButton className=" w-80 rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 border border-solid border-mainWhite">등록하기</CommonButton>
          
        
        </div>
        </div>
        </form>
      );
    }


export default productReg