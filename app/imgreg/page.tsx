import Detailimg from '@/components/Detailimg'
import CommonButton from "@/components/CommonButton";
import React from 'react'

const imgReg = () => {
  return (
   
   <div className='w-30'>
    <Detailimg />
  <div className='text-center'>
    <CommonButton className=" w-80 rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">다음</CommonButton>

    </div> 
   </div>
  )
}

export default imgReg