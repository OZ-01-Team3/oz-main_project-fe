import { Outlet, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import authRequests from './api/authRequests'
import instance from './api/instance'
import Header from './components/Header'
import SideBar from './components/SideNav'
import SignIn from './pages/auth/signIn'
import SignUp from './pages/auth/signUp'
import Chat from './pages/chat'
import ImgReg from './pages/imgReg'
import Main from './pages/main'
import MemberInfo from './pages/mypage/memberInfo'
import OrderHistory from './pages/mypage/orderHistory'
import SalesHistory from './pages/mypage/salesHistory'
import ProductReg from './pages/productReg'
import Search from './pages/search'
import TotalProducts from './pages/totalProducts'
import WishList from './pages/wishList'

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
    profile?: string;
    region?: string;
  }
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
    email: "",
    gender: "",
    grade: "",
    height: "",
    nickname: "",
    phone: "",
    profile: "",
    region: "",
  }
});

/** 유저 컨텍스트를 사용하기 위한 커스텀 훅!!! */
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("not included compoent in usercontext");
  }
  return context;
}


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}


/** 로그인 한 유저만 접근 가능한 라우트*/
const loggedRoutes = [
  <>
    <Route element={<Layout />}>
      <Route path='/wish-list' element={<WishList />} />
      <Route path="/mypage/*" element={
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 md:px-6 flex mt-20">
          <SideBar />
          <Outlet />
        </div>
      }>
        <Route path="member-info" element={<MemberInfo />} />
        <Route path="sales-history" element={<SalesHistory />} />
        <Route path="order-history" element={<OrderHistory />} />
      </Route>

      <Route path='/img-reg' element={<ImgReg />} />
      <Route path='/chat' element={<Chat />} />
      <Route path='/product-reg' element={<ProductReg />} />

    </Route>
  </>

]
/** 모든 유저가 접근 가능한 라우트 */
const commonRoutes = [
  <Route path='/' element={<Layout />}>
    <Route index element={<Main />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/search' element={<Search />} />
    <Route path='/all' element={<TotalProducts />} />
  </Route>
]

/** 유저 데이터 타입 지정 */
interface GetMemberResponseType {
  pk: -1,
  age: 0,
  email: "",
  gender: "",
  grade: "",
  height: "",
  nickname: "",
  phone: "",
  profile: "",
  region: "",
}



function App() {
  const [userData, setUserData] = useState<GetMemberResponseType>(
    {
      pk: -1,
      age: 0,
      email: "",
      gender: "",
      grade: "",
      height: "",
      nickname: "",
      phone: "",
      profile: "",
      region: "",
    },
  )
  //로그인한 회원 정보 불러오기
  const { data: meData, isLoading: isMeLoading, error: meError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await instance.get<GetMemberResponseType>(authRequests.userInfo)
        // console.log("전역 회원정보", response.data)
        return response.data
      } catch (error) {
        console.error("전역 유저정보 불러오기 에러", error)
        throw error
      }
    }
  })

  //회원 정보가 있으면 상태 업데이트
  useEffect(() => {
    if (meData) {
      setUserData(meData)

    }
  }, [meData])


  if (isMeLoading) return <div>Loading...</div>;
  if (meError && !["/", "/sign-in", "/sign-up", "/all", "/search", "/oauth2/redirect"].includes(window.location.pathname))
    return <div>Error: {meError?.message}</div>;


  return (
    <>
      <UserContext.Provider
        value={{ setUserData, userData: userData }}
      >
        <ToastContainer
          position='top-center'
          autoClose={700}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
        <Routes>
          {[...loggedRoutes, ...commonRoutes]}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
