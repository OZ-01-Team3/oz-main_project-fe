'use client';

import AuthInput from '@/components/AuthInput';
import CommonButton from '@/components/CommonButton';
import { useRef } from 'react';

interface FormData {
  id: string;
  type: 'text' | 'number' | 'password' | 'email' | 'tel';
  placeholder: string;
  label: string;
}

//로그인 폼 입력 필드
const formData: FormData[] = [
  { id: 'email', type: 'email', placeholder: '이메일', label: 'Email' },
  { id: 'password', type: 'password', placeholder: '비밀번호', label: 'Password' },
];

// 소셜미디어 로그인 버튼
const socialMedia = [
  { name: 'naver', src: '/images/naver.png' },
  { name: 'kakao', src: '/images/kakao.png' },
  { name: 'google', src: '/images/google.svg' },
];

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
          {formData.map(({ id, type, placeholder, label }, index) => (
            <AuthInput key={id} ref={index === 0 ? inputRef : null} type={type} placeholder={placeholder}>
              {label}
            </AuthInput>
          ))}
          <CommonButton className="w-full rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">
            Sign In
          </CommonButton>
        </form>
      </div>
      <div className="mt-6 font-light">
        아직 회원이 아니신가요?
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
        {socialMedia.map(({ name, src }) => (
          <div key={name} className="w-[39px] h-[39px] mr-3 cursor-pointer overflow-hidden rounded-full">
            <img src={src} alt={name} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default signIn;
