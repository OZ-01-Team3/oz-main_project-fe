"use client"

import AuthInput from "@/components/AuthInput";
import CommonButton from "@/components/CommonButton";
import { useRef } from "react";
const signIn = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const focusInput = () => {
  //   inputRef.current?.focus();
  // }
  return (
    <div className="w-full  bg-mainBlack flex justify-center items-center flex-col">
      <div className="w-[460px] flex justify-center flex-col mt-40">
        <p className="font-didot text-3xl text-center mb-7">Sign In</p>
        <form>
          <AuthInput ref={inputRef} >Email</AuthInput>
          <AuthInput>Password</AuthInput>
          <CommonButton className=" w-full rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">Sign In</CommonButton>
        </form>
      </div>
      <div className="mt-6 font-light">아직 회원이 아니신가요?
        <button type="button" className="font-semibold ml-2">
          Sign in
        </button>
      </div>
      <div className="flex justify-center items-center mt-10 w-[460px]">
        <span className=" w-full h-[1px] bg-mainWhite mr-2"></span>
        <p>or</p>
        <span className=" w-full h-[1px] bg-mainWhite ml-2"></span>
      </div>
      <div className="flex flex-row mt-5">
        <img src="/images/naver.png" className="w-[39px] h-[39px] mr-3 cursor-pointer" />
        <div className=" w-[39px] h-[39px] rounded-full overflow-hidden mr-3 cursor-pointer" cursor-pointer>
          <img src="/images/kakao.png" className="w-full h-full object-cover " />
        </div>
        <img src="/images/google.svg" className="cursor-pointer" />
      </div>
    </div>
  )
}

export default signIn