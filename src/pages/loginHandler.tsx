import instance from '@/api/instance';
import Loading from '@/components/Loading';
import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
const { VITE_BASE_REQUEST_URL, VITE_GOOGLE_AUTH_CLIENT_ID, VITE_GOOGLE_SCOPE, VITE_GOOGLE_SECRET, VITE_NAVER_STATE } = import.meta.env;

const LoginHandler = () => {
  const url = new URL(window.location.href)
  const code = url.searchParams.get("code");
  const cookies = new Cookies();


  const kakaoLogin = async () => {
    try {
      const response = await instance.post(`${VITE_BASE_REQUEST_URL}/users/login/social/kakao/`, 
        {
          code: code
        }
      );
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  }

  const naverLogin = async () => {
    try {
      const response = await instance.post(`${VITE_BASE_REQUEST_URL}/users/login/social/naver/`, 
        {
          code: code,
          state: VITE_NAVER_STATE
        }
      );
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("네이버 로그인 실패", error);
    }
  }

  const googleLogin = async () => {
    try {
      const response = await instance.post(`${VITE_BASE_REQUEST_URL}/users/login/social/google/`, 
        {
          code: code,
        }
      );
      if (response.headers['set-cookie']){
        console.log(response.headers['set-cookie'])
      }
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("구글 로그인 실패", error);
    }
  }
  useEffect(() => {
    if (url.href.includes("kakao")) {
      kakaoLogin()
    } else if (url.href.includes("naver")) {
      naverLogin()
    } else if (url.href.includes("google")) {
      googleLogin()
    }
  }, [])

  return (
    <div><Loading /></div>
  )
}

export default LoginHandler