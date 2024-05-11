"use client"

import AuthInput from "@/components/AuthInput";
import CommonButton from "@/components/CommonButton";
import { useRef } from "react";


const signUp = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="w-full mb-40 bg-mainBlack flex justify-center items-center flex-col">
      <div className="w-[460px] flex justify-center flex-col mt-40">
        <p className="font-didot text-3xl text-center mb-7">Sign Up</p>
        <form>
          <div className="w-full flex items-center">
            <div className="flex-grow">
              <AuthInput ref={inputRef}>Email</AuthInput>
            </div>
            <div className="flex-none w-1/4 ml-2">
              <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">인증번호 발송</CommonButton>
            </div>
          </div>

          <div className="w-full flex items-center">
            <div className="flex-grow relative">
              <AuthInput ref={inputRef}>Auth Code</AuthInput>

              <p className=" absolute bottom-3.5 right-3 text-subGray text-sm">3:00</p>

            </div>
            <div className="flex-none w-1/4 ml-2">
              <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">확인</CommonButton>
            </div>
          </div>
          <AuthInput type="password">Password</AuthInput>
          <AuthInput type="password">Confirm Password</AuthInput>
          <AuthInput type="text">Nickname</AuthInput>
          <AuthInput type="tel">Phone</AuthInput>
          <CommonButton className=" w-full rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">Sign In</CommonButton>
        </form>
      </div>
      <div className="mt-6 font-light">회원이신가요?
        <button type="button" className="font-semibold ml-2">
          Sign in
        </button>
      </div>
    </div>
  )
}

export default signUp