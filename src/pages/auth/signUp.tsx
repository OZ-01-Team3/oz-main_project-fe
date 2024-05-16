'use client';

import authRequests from '@/api/authRequests';
import AuthInput from '@/components/AuthInput';
import CommonButton from '@/components/CommonButton';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';


const SignUp = () => {
  const navigate = useNavigate()

  const [countdown, setCountdown] = useState(0); // 카운트 다운을 위한 상태
  const [authCodeSent, setAuthCodeSent] = useState(false); // 인증코드 전송 여부를 나타내는 상태
  const [authCodeError, setAuthCodeError] = useState(false); // 인증코드 불일치 여부를 나타내는 상태
  const [emailVerified, setEmailVerified] = useState(false);// 이메일 인증이 완료되었을 때 화면에 표시될 문구 상태 

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
    getValues,
  } = form;

  // 이메일 인증코드 전송 후 카운트 다운 시작
  const handleSendAuthCode = async () => {
    const email = getValues('email'); // 폼에서 이메일 값 가져오기
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_REQUEST_URL + authRequests.send_code, {
        email,
      });
      console.log(response, '인증번호 전송 성공');
      toast.success('인증번호가 전송되었습니다');
      setAuthCodeSent(true); // 인증코드 전송 완료 상태로 설정
      setEmailVerified(false);
      // 카운트 다운
      setCountdown(600);
      const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(countdownInterval);
            return 0;
          }
        });
      }, 1000);

      //카운트 다운 종료
      setTimeout(() => {
        clearInterval(countdownInterval);
      }, 600000); // 10분 후
    } catch (error) {
      console.error('인증번호 전송 오류:', error);
      toast.error('인증번호 전송에 실패했습니다.');
    }
  };

  //이메일 인증코드 확인 로직
  const handleAuthCode = async () => {
    const email = getValues('email');
    const code = getValues('code');
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_REQUEST_URL + authRequests.verify_email, {
        email,
        code,
      });
      console.log(response, '인증성공');
      setAuthCodeError(false); // 올바른 인증 코드인 경우 에러 상태 해제
      setEmailVerified(true); // 이메일 인증이 완료됐음을 상태에 설정
      setAuthCodeSent(false);// 인증 성공 시에만 authCodeSent 상태를 설정
      setCountdown(0);// 타이머 초기화
    } catch (error) {
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
        console.error('인증 코드 오류', (error as AxiosError).response?.data);
        setAuthCodeError(true); // 불일치하는 인증 코드 에러 발생 시 상태 변경
      } else {
        console.error('사용자 등록 오류:', error);
      }
    }
  };

  const handleClickSignUp = form.handleSubmit(async data => {
    // mock으로 한거라 나중에 수정해야함
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_BASE_REQUEST_URL + authRequests.signUp, {
        email: data.email,
        password1: data.password,
        password2: data.confirmPassword,
        nickname: data.nickname,
        phone: data.password,
      });
      console.log(response, '회원가입성공');
      navigate('/sign-in')
    } catch (error) {
      //에러처리인데 이미 있는 회원이면.. 무슨코드 내려주는지 모르겟서잉...
      if ((error as AxiosError).response && (error as AxiosError).response?.status === 409) {
        console.error('이미 존재하는 회원입니다:', (error as AxiosError).response?.data);
        toast.error('이미 존재하는 회원입니다.');
      } else {
        console.error('사용자 등록 오류:', error);
      }
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
                <CommonButton
                  className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={handleSendAuthCode}
                >
                  {countdown > 0 ? `재전송` : '인증번호 발송'}
                </CommonButton>
              </div>
            </div>
            {errors.email && <p className=" text-sm text-red-500 mt-1">{errors.email.message}</p>}
            <div className="flex flex-col">
              <div className="w-full flex items-center">
                <div className="flex-grow relative">
                  <AuthInput {...register('code')} type="text" placeholder="인증코드 입력">
                    Auth Code
                  </AuthInput>
                  <p className="absolute bottom-3.5 right-3 text-subGray text-sm">
                    {`${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
                  </p>
                </div>
                <div className="flex-none w-1/4 ml-2">
                  <CommonButton
                    className="w-full h-12 rounded-lg bg-mainWhite px-3.5 py-2.5 mt-6 text-base font-base text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    onClick={handleAuthCode}
                    type="button"
                  >
                    확인
                  </CommonButton>
                </div>
              </div>
              {authCodeSent && (
                <p className="text-subGray text-sm mt-2">인증코드가 발송되었습니다. 이메일을 확인해주세요.</p>
              )}
              {authCodeError && (
                <p className="text-red-500 text-sm mt-2">
                  인증번호가 일치하지 않습니다. 올바른 인증번호를 입력해주세요.
                </p>
              )}
              {emailVerified && <p className="text-subGray text-sm mt-2">이메일 인증이 완료되었습니다.</p>}
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

export default SignUp;
