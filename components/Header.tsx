'use client'
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ChatNotification from "./ChatNotification";
import MobileNave from "./MobileNav";

interface MenuItem {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  Icon?: () => JSX.Element;
}
const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // pc 상태


  //pc 알림
  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };


  const mainMenuItems: MenuItem[] = [
    { label: "알림", onClick: handleToggleNotification },
    { label: "마이페이지" },
    { label: "로그아웃" },
  ];

  const subMenuItems: MenuItem[] = [
    { label: "WishList" },
    { label: "MyCloset" },
    { label: "", Icon: () => <MagnifyingGlassIcon className="w-6" /> },
  ];

  return (
    <>
      <nav className="w-full flex justify-between items-center h-24 p-4 bg-mainBlack">
        <div className="flex-1"></div>
        <div className="font-didot text-5xl  text-mainWhite text-center md:text-left">Coaty Closet</div>
        <div className=" lg:hidden  xl:hidden flex items-center justify-end flex-1">
          <button onClick={handleToggleNotification}>
            <BellIcon className="w-6 h-6 text-mainWhite" />
          </button>
        </div>
        <div className="xl:flex lg:flex md:hidden sm:hidden  flex-1 justify-end"> {/* PC 사이즈에서만 보이도록 수정 */}
          <div className="w-auto">
            <ul className="flex justify-between w-52 text-sm font-light text-mainWhite">
              {mainMenuItems.map(({ label, onClick }) => (
                <li key={label} className="cursor-pointer" onClick={onClick}>{label}</li>
              ))}
            </ul>
            <ul className="flex justify-between mt-3 font-didot text-mainWhite">
              {subMenuItems.map(({ label, Icon }) => (
                <li key={label || Icon?.name} className="cursor-pointer">
                  {Icon ? <Icon /> : label}
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
  )
}

export default Header
