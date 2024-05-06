"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

interface MenuItem {
  label: string;
  Icon?: () => JSX.Element;


}
const Header = () => {

  // 메인 메뉴 항목
  const mainMenuItems: MenuItem[] = [
    { label: "알림" },
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
    <nav className="w-full flex justify-between items-center h-24 p-4 bg-mainBlack">
      <div className="flex-1"></div> {/* 좌측 여백용 빈 div */}
      <div className="font-didot text-5xl text-mainWhite">Coaty Closet</div>
      <div className="flex-1 flex justify-end">
        <div className="w-auto">
          <ul className="flex justify-between w-52 text-sm font-light text-mainWhite">
            {mainMenuItems.map(({ label }) => (
              <li key={label} className="cursor-pointer">{label}</li>
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
  )
}

export default Header