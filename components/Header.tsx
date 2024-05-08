"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import ChatNotification from "./ChatNotification";

interface MenuItem {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  Icon?: () => JSX.Element;


}
const Header = () => {

  // 알림 바
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen)
  }

  // 메인 메뉴 항목
  const mainMenuItems: MenuItem[] = [
    { label: "알림", onClick: toggleNotification },
    { label: "마이페이지" },
    { label: "로그아웃" },
  ];

  // 서브 메뉴 항목
  const subMenuItems: MenuItem[] = [
    { label: "WishList" },
    { label: "MyCloset" },
    { label: "", Icon: () => <MagnifyingGlassIcon className="w-6" /> }, // 아이콘만 있는 항목
  ];

  return (
    <>
      <nav className="w-full flex justify-between items-center h-24 p-4 bg-mainBlack">
        <div className="flex-1"></div> {/* 좌측 여백용 빈 div */}
        <div className="font-didot text-5xl text-mainWhite">Coaty Closet</div>
        <div className="flex-1 flex justify-end">
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
      <ChatNotification isOpen={isNotificationOpen} onClose={toggleNotification} />
    </>
  )
}

export default Header