
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { BellIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChatNotification from './ChatNotification';
import MobileNave from './MobileNav';

interface MenuItem {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  Icon?: () => JSX.Element;
  path?: string;
}
const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // pc 상태
  const navigate = useNavigate();
  //pc 알림
  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const mainMenuItems: MenuItem[] = [
    { label: '알림', onClick: handleToggleNotification },
    { label: '마이페이지', path: '/mypage/member-info' },
    { label: '로그인', path: '/sign-in' },
  ];

  const subMenuItems: MenuItem[] = [
    { label: 'WishList', path: '/wish-list' },
    { label: 'MyCloset', path: '/404' },
    { label: '', Icon: () => <MagnifyingGlassIcon className="w-6" /> },
  ];

  return (
    <>
      <nav className="w-full flex justify-between items-center h-24 p-4 bg-mainBlack">
        <div className="flex-1"></div>
        <div className="font-didot text-5xl  text-mainWhite text-center md:text-left cursor-pointer" onClick={() => navigate('/')}>Coaty Closet</div>
        <div className=" lg:hidden  xl:hidden flex items-center justify-end flex-1">
          <button onClick={handleToggleNotification}>
            <BellIcon className="w-6 h-6 text-mainWhite" />
          </button>
        </div>
        <div className="xl:flex lg:flex md:hidden sm:hidden  flex-1 justify-end">
          {' '}
          {/* PC 사이즈에서만 보이도록 수정 */}
          <div className="w-auto">
            <ul className="flex justify-between w-52 text-sm font-light text-mainWhite">
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
      <ChatNotification isOpen={isNotificationOpen} onClose={handleToggleNotification} />

      <div className="w-full  lg:hidden xl:hidden">
        <MobileNave />
      </div>
    </>
  );
};

export default Header;
