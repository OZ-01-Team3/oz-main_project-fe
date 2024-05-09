import Link from 'next/link';

type SidebarItemProps = {
  text: string;
  href?: string;
};

const SidebarItem = ({ text, href }: SidebarItemProps) => {
  // href가 있을 경우만 Link 컴포넌트를 사용하여 래핑
  const content = <li className="py-1.5 cursor-pointer">{text}</li>;

  return href ? <Link href={href}>{content}</Link> : content;
};

const SideBar = () => {
  const sidebarItems = [
    { text: '내 옷장' },
    { text: '주문 이력', href: '/mypage/order-history' },
    { text: '대여 상품', href: '/mypage/sales-history' },
    { text: '회원 정보', href: '/mypage/member-info' },
  ];

  return (
    <nav className="w-80 sm:w-44 h-auto h-min-[300px] border-r-[1px] border-mainWhite p-5">
      <ul className="flex justify-end items-end flex-col text-xl sm:text-lg">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} text={item.text} href={item?.href} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
