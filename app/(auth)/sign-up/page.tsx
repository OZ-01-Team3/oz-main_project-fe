'use client';

import AuthInput from '@/components/AuthInput';
import CommonButton from '@/components/CommonButton';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const signUp = () => {
  const signUpFormSchema = z
    .object({
      // 이메일 형식 지정
      email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
      code: z.string().min(1, { message: '인증코드를 입력해주세요.' }),
      password: z // 비밀번호 형식 지정
        .string()
        .regex(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/,
          '문자와 특수문자, 숫자가 혼합된 8~20자리의 비밀번호를 입력해주세요.'
        )
        .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
        .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
      confirmPassword: z.string(),
      nickname: z.string().min(1, { message: '닉네임은 필수 입력값입니다.' }),
      phone: z.string().regex(/^(\d{3}-\d{3,4}-\d{4})$/, '전화번호 형식이 유효하지 않습니다.'),
    })
    .refine(data => data.password === data.confirmPassword, {
      path: ['confirmPassword'],
      message: '비밀번호가 일치하지 않습니다.',
    });

  //회원가입 폼 상태 관리
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      phone: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    formState: { errors },
  } = form;

  const handleClickSignUp = form.handleSubmit(async data => {
    // mock으로 한거라 나중에 수정해야함
    try {
      const response = await axios.post('/api/v1/members/register', {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        phone: data.password,
      });
      console.log(response, '회원가입성공');
    } catch (error) {
      //에러처리인데 이건 나중에 api 그거 맞춰서 나오면 수정~
      // if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
      //   console.error('이미 존재하는 회원입니다:', (error as AxiosError).response?.data);
      //   toast.error('이미 존재하는 회원입니다.');
      // } else {
      //   console.error('사용자 등록 오류:', error);
      // }
    }
    console.log(data);
  });

  return (
    <FormProvider {...form}>
      <div className="w-full mb-40 bg-mainBlack flex justify-center items-center flex-col">
        <div className="w-[460px] flex justify-center flex-col mt-40">
          <p className="font-didot text-3xl text-center mb-7">Sign Up</p>
          <form onSubmit={handleClickSignUp} autoComplete="off">
            <div className="w-full flex items-center">
              <div className="flex-grow">
                <AuthInput {...register('email')} type="email">
                  Email
                </AuthInput>
              </div>
              <div className="flex-none w-1/4 ml-2">
                <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  인증번호 발송
                </CommonButton>
              </div>
            </div>
            {errors.email && <p className=" text-sm text-red-500 mt-1">{errors.email.message}</p>}
            <div className="w-full flex items-center">
              <div className="flex-grow relative">
                <AuthInput {...register('code')} type="text">
                  Auth Code
                </AuthInput>
                <p className=" absolute bottom-3.5 right-3 text-subGray text-sm">3:00</p>
              </div>
              <div className="flex-none w-1/4 ml-2">
                <CommonButton className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  확인
                </CommonButton>
              </div>
            </div>
            {errors.code && <p className=" text-sm text-red-500 mt-1">{errors.code.message}</p>}{' '}
            <AuthInput {...register('password')} type="password">
              Password
            </AuthInput>
            {errors.password && <p className=" text-sm text-red-500 mt-1">{errors.password.message}</p>}
            <AuthInput {...register('confirmPassword')} type="password">
              Confirm Password
            </AuthInput>
            {errors.confirmPassword && <p className=" text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            <AuthInput {...register('nickname')} type="text">
              Nickname
            </AuthInput>
            {errors.nickname && <p className=" text-sm text-red-500 mt-1">{errors.nickname.message}</p>}
            <AuthInput {...register('phone')} type="tel" placeholder="010-0000-0000">
              Phone
            </AuthInput>
            {errors.phone && <p className=" text-sm text-red-500 mt-1">{errors.phone.message}</p>}
            <CommonButton className=" w-full rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">
              Sign In
            </CommonButton>
          </form>
        </div>
        <div className="mt-6 font-light">
          회원이신가요?
          <button type="button" className="font-semibold ml-2">
            Sign in
          </button>
        </div>
      </div>
    </FormProvider>
  );
};

export default signUp;
