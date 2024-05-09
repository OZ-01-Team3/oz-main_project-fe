
import ProductReg from '@/components/ProductReg';
import CommonButton from "@/components/CommonButton";


const productReg = () => {


      return (
        <form>
        <div className='text-center'>
        

         
          <ProductReg />


          <div className='text-right'>
          <CommonButton className=" w-44 rounded-lg bg-mainBlack px-3.5 py-2.5 text-lg font-semibold font-didot  text-mainWhite  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-3 border border-solid border-mainWhite">임시저장</CommonButton>
          <CommonButton className=" w-44 rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10 ml-3 border border-solid border-mainWhite">등록하기</CommonButton>
          
        
        </div>
        </div>
        </form>
      );
    }


export default productReg