import axios, { AxiosResponse } from 'axios';

const { VITE_BASE_REQUEST_URL } = import.meta.env;
const axiosClient = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
});

interface SignUpType {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
  phone: string;
}

// interface TokenRefreshResponse {
//   refresh: string;
// }

const authRequests = {
  signUp: '/accounts/signup/', // 회원가입
  login: '/accounts/login/', //로그인
  logout: '/accounts/logout/', // 로그아웃
  userInfo: '/accounts/user/', // 회원 정보조회, 수정, 일부수정
  // 토큰
  userLeave: '/accounts/token/verify/', //access token 유효성 검사
  refresh: '/accounts/token/refresh', // access token 재발급
  // 이메일 전송
  sendCode: '/accounts/send-code/', // 이메일 코드 전송
  verifyEmail: '/accounts/confirm-email/', // 이메일 인증
};

//로그인
export const loginAPI = (email: string, password: string) =>
  axiosClient.post<UserActivation>(authRequests.login, {
    email,
    password,
  });

//회원가입
export const signUpAPI = (data: SignUpType): Promise<AxiosResponse<UserActivation, any>> =>
  axiosClient.post<UserActivation>(authRequests.signUp, data);

//이메일 전송
export const sendCodeAPI = (email: string) =>
  axiosClient.post<UserActivation>(authRequests.sendCode, {
    email,
  });

// 이메일 인증
export const verifyEmailAPI = (email: string, code: string) => {
  axiosClient.post<UserActivation>(authRequests.verifyEmail, {
    email,
    code,
  });
};

// 토큰 리프레시
// export const refreshAPI = (): Promise<AxiosResponse<TokenRefreshResponse>> => {
//   const refreshToken = cookies.get('rc');
//   return axios.post<TokenRefreshResponse>(
//     authRequests.refresh,
//     {},
//     {
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );
// };

export default authRequests;
