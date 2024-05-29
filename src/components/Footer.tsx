import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <>
      <div className="pt-32 w-2/3 ml-auto mr-auto text-center font-didot flex flex-col items-center justify-center mb-10">
        <p className="text-3xl">Coaty Closet</p>
        <p className="text-footerOrange text-sm">
          Rent your style, don't buy it
        </p>

        <div className="flex flex-row mt-5 mb-5">
          <div className="w-10 h-10 border rounded-full mr-5 hover:border-footerOrange flex justify-center items-center ">
            <ShareIcon className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 border rounded-full mr-5 hover:border-footerOrange flex justify-center items-center ">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6" />
          </div>
          <div className="w-10 h-10 border rounded-full mr-5 hover:border-footerOrange flex justify-center items-center ">
            <HeartIcon className="w-6 h-6" />
          </div>
          <div className="w-10 h-10 border rounded-full mr-5 hover:border-footerOrange flex justify-center items-center ">
            <HandThumbDownIcon className="w-6 h-6" />
          </div>
          <div className="w-10 h-10 border rounded-full  hover:border-footerOrange flex justify-center items-center ">
            <EllipsisVerticalIcon className="w-6 h-6" />
          </div>
        </div>
        <p className="text-sm mb-5">
          Copyright © Coaty Closet Inc. All right reserved
        </p>
        <p className="text-xs w-5/6 font-base ">
          Coaty Closet는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          <br />
          전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령 및 Coaty
          Closet의 약관에 따라 상품, 상품정보, 거래에 관한 책임은 개별
          판매자에게 귀속하고,
          <br />
          Coaty Closet는 원칙적으로 회원간 거래에 대하여 책임을 지지 않습니다.
          다만, Coaty Closet가 직접 판매하는 상품에 대한 책임은 Coaty Closet에게
          귀속합니다
        </p>
      </div>
    </>
  );
};

export default Footer;
