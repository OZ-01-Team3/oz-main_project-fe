import axios from 'axios';

import { Cookies } from 'react-cookie';
import authRequests from './authRequests';

const { VITE_BASE_REQUEST_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

const cookies = new Cookies();

const tokenRefresh = async () => {
  try {
    const refreshToken = cookies.get('rf');

    const response = await axios.post(VITE_BASE_REQUEST_URL + authRequests.refresh, {
      // headers: {
      //   Authorization: `Bearer ${refreshToken}`,
      //   'Content-Type': 'application/json',
      // },

      rf: refreshToken,
    });
    // console.log("확잉용", response);
    cookies.set('accessToken', response.data.access);
  } catch (error) {
    console.error('토큰 갱신 실패', error);
  }
};

function getCookieValue(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }
  return null;
}

// 요청이 전달되기 전에 작업 수행 혹은 요청 오류가 있는 함수를 받음
instance.interceptors.request.use(
  config => {
    const accessToken = cookies.get('accessToken');
    // config.headers['Content-Type'] = 'application/json';

    const csrfToken = getCookieValue('csrftoken');
    config.headers['X-CSRFToken'] = csrfToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.withCredentials = true;
    }

    // 폼 데이터를 보낼 때만 Content-Type을 "multipart/form-data"로 설정
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    console.log('잘 바뀌낭');
    return config;
  },
  error => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.status === 404) {
      console.log('404 일세');
    }
    return response;
  },
  async error => {
    if (error.response?.status === 401) {
      try {
        await tokenRefresh();
        const new_accessToken = cookies.get('accessToken');
        error.config.headers['Authorization'] = `Bearer ${new_accessToken}`;

        return axios.request(error.config);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        return Promise.reject(refreshError); // 토큰 갱신 실패 시 에러 처리
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
