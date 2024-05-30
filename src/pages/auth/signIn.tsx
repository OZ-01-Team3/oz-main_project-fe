import { UserContext } from '@/App';
import { loginAPI } from '@/api/authRequests';
import AuthInput from '@/components/AuthInput';
import CommonButton from '@/components/CommonButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useContext } from 'react';
import { Cookies } from 'react-cookie';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

const {
  VITE_REST_API_KEY,
  VITE_KAKAO_REDIRECT_URI,
  VITE_GOOGLE_REDIRECT_URI,
  VITE_NAVER_REDIRECT_URI,
  VITE_GOOGLE_AUTH_CLIENT_ID,
  VITE_GOOGLE_SCOPE,
  VITE_NAVER_CLIENT_ID,
  VITE_NAVER_STATE,
} = import.meta.env;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${VITE_REST_API_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&prompt=login`;

const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${VITE_GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=${VITE_GOOGLE_SCOPE}`;

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${VITE_NAVER_CLIENT_ID}&state=${VITE_NAVER_STATE}&redirect_uri=${VITE_NAVER_REDIRECT_URI}`;

// 소셜미디어 로그인 버튼
const socialMedia = [
  { name: 'naver', src: '/images/naver.png', url: NAVER_AUTH_URL },
  { name: 'kakao', src: '/images/kakao.png', url: KAKAO_AUTH_URL },
  { name: 'google', src: '/images/google.svg', url: GOOGLE_AUTH_URL },
];

const SignIn = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);

  // 유효성 검증
  const signInFormSchema = zod.object({
    // 이메일 형식 지정
    email: zod.string().email({ message: '이메일 형식이 아닙니다.' }),
    password: zod.string().min(1, { message: '비밀번호를 입력해주세요.' }),
  });

  //로그인 폼 상태 관리
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });
  const {
    register,
    formState: { errors },
    setError,
  } = form;

  const cookies = new Cookies();

  //Sign In 버튼 눌렀을 때 api 호출하는 함수
  const handleClickSignIn = form.handleSubmit(async data => {
    try {
      const response = await loginAPI(data.email, data.password);
      cookies.set('accessToken', response.data.access);
      cookies.set('refreshToken', response.data.refresh);
      setIsLoggedIn(true);
      console.log(response, '로그인 성공');
      navigate('/', { replace: true });
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 400) {
        console.error('이메일 또는 비밀번호가 잘못되었습니다.', (error as AxiosError).response?.data);
        setError('email', { type: 'custom', message: '이메일 또는 비밀번호가 잘못되었습니다.' });
        setError('password', { type: 'custom', message: '이메일 또는 비밀번호가 잘못되었습니다.' });
      } else {
        console.error('사용자 등록 오류:', error);
      }
    }
  });
  // console.log("유저 정보 ", user)
  return (
    <FormProvider {...form}>
      <div className="w-full  bg-mainBlack flex justify-center items-center flex-col">
        <div className="w-[460px] flex justify-center flex-col mt-40">
          <p className="font-didot text-3xl text-center mb-7">Sign In</p>
          <form onSubmit={handleClickSignIn} autoComplete="off">
            <AuthInput {...register('email')} type="email" placeholder="이메일">
              Email
            </AuthInput>
            {errors.email && <p className=" text-sm text-red-500 mt-1">{errors.email.message}</p>}
            <AuthInput {...register('password')} type="password" placeholder="비밀번호">
              password
            </AuthInput>
            <CommonButton className="w-full rounded-lg bg-mainWhite px-3.5 py-2.5 text-lg font-semibold font-didot text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6">
              Sign In
            </CommonButton>
          </form>
        </div>
        <div className="mt-6">
          아직 회원이 아니신가요?
          <Link to="/sign-up">
            <button type="button" className="font-semibold ml-2">
              Sign in
            </button>
          </Link>
        </div>
        <div className="flex justify-center items-center mt-10 w-[460px]">
          <span className=" w-full h-[1px] bg-mainWhite mr-2"></span>
          <p>or</p>
          <span className=" w-full h-[1px] bg-mainWhite ml-2"></span>
        </div>
        <div className="flex flex-row mt-5">
          {socialMedia.map(({ name, src, url }) => (
            <a key={name} href={url} className="w-[39px] h-[39px] mr-3 cursor-pointer overflow-hidden rounded-full">
              <img src={src} alt={name} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      </div>
    </FormProvider>
  );
};

export default SignIn;
