'use client'

const SideBar = () => {
  return (
    <nav className=" w-80 h-[800px] border-r-[1px] border-mainWhite p-5">

      <ul className="flex justify-end items-end flex-col text-2xl">
        <li>내 옷장</li>
        <li>주문 이력</li>
        <li>대여 상품</li>
        <li>회원 정보</li>
      </ul>


    </nav>
  )
}

export default SideBar