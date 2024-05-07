'use client'

const SideBar = () => {
  return (
    <nav className=" w-80 h-auto h-min-[300px] border-r-[1px] border-mainWhite p-5">

      <ul className="flex justify-end items-end flex-col text-xl">
        <li className="p-2 cursor-pointer">내 옷장</li>
        <li className="p-2 cursor-pointer">주문 이력</li>
        <li className="p-2 cursor-pointer">대여 상품</li>
        <li className="p-2 cursor-pointer">회원 정보</li>
      </ul>


    </nav>
  )
}

export default SideBar