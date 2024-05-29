import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import Header from './components/Header';
import SideBar from './components/SideNav';
import ProductDetailModal from './components/productDetail/ProductDetailModal';
import SignIn from './pages/auth/signIn';
import SignUp from './pages/auth/signUp';
import Chat from './pages/chat';
import Main from './pages/main';
import MemberInfo from './pages/mypage/memberInfo';
import OrderHistory from './pages/mypage/orderHistory';
import SalesHistory from './pages/mypage/salesHistory';
import ImgRegistration from './pages/products/imgRegistration';

import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

import authRequests from './api/authRequests';
import instance from './api/instance';

import { NotificationProvider } from './NotificationContext';
import ProductRegistrationButton from './components/ProductRegistrationButton';
import LoginHandler from './pages/loginHandler';
import ImageUpdate from './pages/products/ImageUpdate';
import ProductUpdate from './pages/products/ProductUpdate';
import ProductRegistration from './pages/products/productRegistration';
import TotalProducts from './pages/products/totalProducts';
import Search from './pages/search';
import WishList from './pages/wishList';

/** PrivateRoute 타입 정의*/
interface PrivateRouteProps {
  children: ReactNode;
}
/**사용자 타입 정의 */
export interface UserType {
  userData: {
    pk: number;
    age?: number;
    email: string;
    gender?: string;
    grade?: string;
    height?: string;
    nickname: string;
    phone: string;
    profileImage?: string;
    region?: string;
  };
}

/** 유저 컨텍스트 타입 정의 */
interface UserContextType {
  setUserData: Dispatch<SetStateAction<GetMemberResponseType>>;
  userData: GetMemberResponseType;
}


/** 유저 정보를 전역관리하기 위한 컨텍스트 */
export const UserContext = createContext<UserContextType>({
  setUserData: () => { },
  userData: {
    pk: -1,
    age: 0,
    email: '',
    gender: '',
    grade: '',
    height: '',
    nickname: '',
    phone: '',
    profile_img: '',
    region: '',
  },
});

/** 유저 컨텍스트를 사용하기 위한 커스텀 훅!!! */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('not included compoent in usercontext');
  }
  return context;
};

/** PrivateRoute 컴포넌트 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  return accessToken ? children : <Navigate to="/sign-in" />;
};

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

/** 로그인 한 유저만 접근 가능한 라우트*/
const loggedRoutes = [
  <Route
    element={
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    }
  >
    <Route path="/wish-list" element={<WishList />} />
    <Route
      path="/mypage/*"
      element={
        <div className="flex mt-20 justify-between w-[1000px] xl:w-[1000px] lg:w-[800px] md:w-[550px] sm:w-[460px] mx-auto  h-auto ">
          <SideBar />
          <Outlet />
        </div>
      }
    >
      <Route path="member-info" element={<MemberInfo />} />
      <Route path="sales-history" element={<SalesHistory />} />
      <Route path="order-history" element={<OrderHistory />} />
    </Route>

    <Route path="/img-reg" element={<ImgRegistration />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/product-reg" element={<ProductRegistration />} />
    <Route path="/img-update/:productId" element={<ImageUpdate />} />
    <Route path="/product-update/:productId" element={<ProductUpdate />} />
  </Route>,
];
/** 모든 유저가 접근 가능한 라우트 */
const commonRoutes = [
  <Route path="/" element={<Layout />}>
    <Route index element={<Main />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/search" element={<Search />} />
    <Route path="/all" element={<TotalProducts />} />
    <Route path="/product/:productId" element={<ProductDetailModal />} />
    <Route path="/oauth2/naver/redirect" element={<LoginHandler />} />
    <Route path="/oauth2/kakao/redirect" element={<LoginHandler />} />
    <Route path="/oauth2/google/redirect" element={<LoginHandler />} />
  </Route>,
];

/** 유저 데이터 타입 지정 */
interface GetMemberResponseType {
  pk: -1;
  age: 0;
  email: '';
  gender: '';
  grade: '';
  height: '';
  nickname: '';
  phone: '';
  profile_img: '';
  region: '';
}

function App() {
  const [userData, setUserData] = useState<GetMemberResponseType>({
    pk: -1,
    age: 0,
    email: '',
    gender: '',
    grade: '',
    height: '',
    nickname: '',
    phone: '',
    profile_img: '',
    region: '',
  });

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;


  //로그인한 회원 정보 불러오기
  const {
    data: meData,
    isLoading: isMeLoading,
    error: meError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await instance.get<GetMemberResponseType>(authRequests.userInfo);
        // console.log("전역 회원정보", response.data)
        return response.data;
      } catch (error) {
        console.error('전역 유저정보 불러오기 에러', error);
        throw error;
      }
    },
    enabled: !!accessToken,
  });

  //회원 정보가 있으면 상태 업데이트
  useEffect(() => {
    if (meData) {
      setUserData(meData);
    }
  }, [meData]);

  if (isMeLoading) return <div>Loading...</div>;
  if (
    meError &&
    !['/', '/sign-in', '/sign-up', '/all', '/search', '/oauth2/redirect'].includes(window.location.pathname)
  )
    return <div>Error: {meError?.message}</div>;

  return (
    <>
      <NotificationProvider>
        <UserContext.Provider value={{ setUserData, userData: userData }}>
          <ToastContainer
            position="top-center"
            autoClose={700}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>{[...loggedRoutes, ...commonRoutes]}</Routes>
          {accessToken && (location.pathname === '/' || location.pathname === '/all') && <ProductRegistrationButton />}
        </UserContext.Provider>
      </NotificationProvider>
    </>
  );
}

export default App;
