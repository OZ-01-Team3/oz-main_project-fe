import Loading from '@/components/Loading';
import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
const { VITE_BASE_REQUEST_URL, VITE_GOOGLE_AUTH_CLIENT_ID, VITE_GOOGLE_SCOPE, VITE_GOOGLE_SECRET } = import.meta.env;

const LoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const cookies = new Cookies();



  const kakaoLogin = async () => {
    try {
      const response = await axios.post(`${VITE_BASE_REQUEST_URL}/users/login/social/kakao/`, {
        code: code
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
      );
      // console.log("카카오", response)
      // localStorage.setItem("name",response.data)
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  }

  const googleLogin = async () => {
    try {
      const response = await axios.post(`${VITE_BASE_REQUEST_URL}/users/login/social/google/`, {
        code: code,
        client_id: VITE_GOOGLE_AUTH_CLIENT_ID,
        client_secret: VITE_GOOGLE_SECRET,
        redirect: 'http://localhost:5173/',

      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
      );
      // console.log("카카오", response)
      // localStorage.setItem("name",response.data)
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  }




  useEffect(() => {
    kakaoLogin()
    googleLogin()
  }, [])

  return (
    <div><Loading /></div>
  )
}

export default LoginHandler