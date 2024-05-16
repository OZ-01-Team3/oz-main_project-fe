import { Outlet, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import Header from './components/Header'
import SignIn from './pages/auth/signIn'
import SignUp from './pages/auth/signUp'
import Chat from './pages/chat'
import ImgReg from './pages/imgReg'
import Main from './pages/main'
import MemberInfo from './pages/mypage/\bmemberInfo'
import OrderHistory from './pages/mypage/orderHistory'
import SalesHistory from './pages/mypage/salesHistory'
import ProductReg from './pages/productReg'
import Search from './pages/search'
import TotalProducts from './pages/totalProducts'
import WishList from './pages/wishList'
function App() {

  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  }

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
