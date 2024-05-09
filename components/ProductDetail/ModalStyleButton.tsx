import { PropsWithChildren } from 'react';
// 해시태그 버튼 컴포넌트
function ModalStyleButton({ children }: PropsWithChildren) {
  return (
    <button className="border text-sm border-mainBlack bg-mainWhite text-mainBlack rounded-full pt-1 pb-1 pl-3 pr-3 w-20 mr-1 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer sm:w-16 sm:px-2 sm:ml-0 sm:text-xs ">
      {children}
    </button>
  );
}

export default ModalStyleButton;
