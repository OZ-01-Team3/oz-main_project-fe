import useAuthStore from '@/stores/useAuthStore';
import useNotificationStore from '@/stores/useNotification';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { BellIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import MobileNave from './MobileNav';
import Notification from './Notification';

interface MenuItem {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  Icon?: () => JSX.Element;
  path?: string;
  className?: string;
}
const cookies = new Cookies();
const Header = () => {
  const notifications = useNotificationStore(state => state.notifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // pc 상태
  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);
  const navigate = useNavigate();
  //쿠키에서 액세스 토큰 확인
  useEffect(() => {
    const accessToken = cookies.get('ac');
    setIsLoggedIn(!!accessToken);
  }, [setIsLoggedIn]);

  //pc 알림
  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    const allCookies = cookies.getAll(); // 모든 쿠키 가져오기
    Object.keys(allCookies).forEach(cookieName => cookies.remove(cookieName)); // 모든 쿠키 이름을 순회하며 삭제
    logout(); // zustand 스토어에서 로그아웃 처리
    navigate('/');
  };

  const mainMenuItems: MenuItem[] = [
    {
      label: '알림',
      onClick: handleToggleNotification,
      className: notifications.length > 0 ? 'text-red-200' : '',
    },
    { label: '마이페이지', path: '/mypage/member-info' },
    isLoggedIn ? { label: '로그아웃', onClick: handleLogout } : { label: '로그인', path: '/sign-in' },
  ];

  const subMenuItems: MenuItem[] = [
    { label: 'WishList', path: '/wish-list' },
    { label: 'MyCloset', path: '/404' },
    { label: '', path: '/search', Icon: () => <MagnifyingGlassIcon className="w-6" /> },
  ];

  return (
    <>
      <nav className="w-full flex justify-between items-center  h-24 p-4 bg-mainBlack">
        <div className="flex-1"></div>
        <div
          className="font-didot text-5xl  text-mainWhite text-center md:text-left cursor-pointer"
          onClick={() => navigate('/')}
        >
          Coaty Closet
        </div>
        <div className=" lg:hidden  xl:hidden flex items-center justify-end flex-1">
          <button onClick={handleToggleNotification}>
            <BellIcon className="w-6 h-6 text-mainWhite" />
          </button>
        </div>
        <div className="xl:flex lg:flex md:hidden sm:hidden  flex-1 justify-end">
          {' '}
          {/* PC 사이즈에서만 보이도록 수정 */}
          <div className="w-auto">
            <ul className="flex justify-between w-52 text-sm ftext-mainWhite">
              {mainMenuItems.map(({ label, onClick, path }) => (
                <li key={label} className="cursor-pointer" onClick={onClick}>
                  {path ? (
                    <Link to={path}>{label}</Link> // 링크가 있는 경우 Link 컴포넌트 사용
                  ) : (
                    <span onClick={onClick}>{label}</span> // 링크가 없는 경우 일반 span 사용
                  )}
                </li>
              ))}
            </ul>
            <ul className="flex justify-between mt-3 font-didot text-mainWhite">
              {subMenuItems.map(({ label, Icon, path }) => (
                <li key={label || Icon?.name} className="cursor-pointer">
                  {path ? (
                    <Link to={path}>{Icon ? <Icon /> : label}</Link> // 링크가 있는 경우 Link 컴포넌트 사용
                  ) : (
                    <span>{Icon ? <Icon /> : label}</span> // 링크가 없는 경우 일반 span 사용
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Notification isOpen={isNotificationOpen} onClose={handleToggleNotification} />

      <div className="w-full  lg:hidden xl:hidden">
        <MobileNave />
      </div>
    </>
  );
};

export default Header;
