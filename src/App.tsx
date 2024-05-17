import { Outlet, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { useQuery } from '@tanstack/react-query'
import authRequests from './api/authRequests'
import instance from './api/instance'
import Header from './components/Header'
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
import useUserStore from './stores/userStore'

interface GetMemberResponseType {
  age: number;
  email: string;
  gender: string;
  grade: string;
  height: number;
  nickname: string;
  phone: string;
  profile_img: string;
  region: string;
}

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const loggedRoutes = [
  <Route path='/' element={<Layout />}>
    <Route index element={<Main />} />
    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/wish-list' element={<WishList />} />
    <Route path='/mypage/member-info' element={<MemberInfo />} />
    <Route path='/mypage/sales-history' element={<SalesHistory />} />
    <Route path='/mypage/order-history' element={<OrderHistory />} />
    <Route path='/mypage/order-history' element={<OrderHistory />} />
    <Route path='/img-reg' element={<ImgReg />} />
    <Route path='/chat' element={<Chat />} />
    <Route path='/product-reg' element={<ProductReg />} />
    <Route path='/search' element={<Search />} />
    <Route path='/all' element={<TotalProducts />} />
    <Route path='/wish' element={<WishList />} />
  </Route>
]


function App() {
  const setUser = useUserStore((state) => state.setUser)

  const { data: meData, isLoading: isMeLoading, error: meError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await instance.get(authRequests.userInfo)
        console.log("전역 회원정보", response.data)
        setUser(response.data)
        return response.data
      } catch (error) {
        console.error("전역 유저정보 불러오기 에러", error)
        throw error
      }
    }
  })

  //스토어에 저장하지 말고 context로 저장해둘것,,~
  if (isMeLoading) return <div>Loading...</div>;
  if (meError && !["/", "/sign-in", "/sign-up", "/all", "/search", "/oauth2/redirect"].includes(window.location.pathname))
    return <div>Error: {meError?.message}</div>;




  return (
    <>
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
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/wish-list' element={<WishList />} />
          <Route path='/mypage/member-info' element={<MemberInfo />} />
          <Route path='/mypage/sales-history' element={<SalesHistory />} />
          <Route path='/mypage/order-history' element={<OrderHistory />} />
          <Route path='/mypage/order-history' element={<OrderHistory />} />
          <Route path='/img-reg' element={<ImgReg />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/product-reg' element={<ProductReg />} />
          <Route path='/search' element={<Search />} />
          <Route path='/all' element={<TotalProducts />} />
          <Route path='/wish' element={<WishList />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
