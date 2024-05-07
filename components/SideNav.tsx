'use client'


type SidebarItemProps = {
  text: string;
};


const SidebarItem = ({ text }: SidebarItemProps) => {
  return (
    <li className="p-2 cursor-pointer">{text}</li>
  );
};

const SideBar = () => {
  const sidebarItems = [
    { text: '내 옷장' },
    { text: '주문 이력' },
    { text: '대여 상품' },
    { text: '회원 정보' },
  ];

  return (
    <nav className="w-80 h-auto h-min-[300px] border-r-[1px] border-mainWhite p-5">
      <ul className="flex justify-end items-end flex-col text-xl">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} text={item.text} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
