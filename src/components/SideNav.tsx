import { Link } from 'react-router-dom';

type SidebarItemProps = {
  text: string;
  href?: string;
};

const SidebarItem = ({ text, href }: SidebarItemProps) => {
  // href가 있을 경우만 Link 컴포넌트를 사용하여 래핑
  const content = <li className="py-1.5 cursor-pointer">{text}</li>;

  return href ? <Link to={href}>{content}</Link> : content;
};

const SideBar = () => {
  const sidebarItems = [
    { text: '내 옷장' },
    { text: '주문 이력', href: '/mypage/order-history' },
    { text: '대여 상품', href: '/mypage/sales-history' },
    { text: '회원 정보', href: '/mypage/member-info' },
  ];

  return (
    <nav className="w-44 h-screen h-min-[300px] border-r-[1px] border-mainWhite pr-8 py-5 mr-8 ">
      <ul className="flex items-end flex-col text-xl sm:text-lg h-ul justify-start h-full">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} text={item.text} href={item?.href} />
        ))}
      </ul>
    </nav>
  );
};

export default SideBar;
