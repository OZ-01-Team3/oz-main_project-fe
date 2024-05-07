import { PropsWithChildren } from "react";

const StyleButton = ({ children }: PropsWithChildren) => {
  return (
    <button className="border border-mainBlack bg-mainWhite text-mainBlack rounded-full pt-2 pb-2 pl-6 pr-6 w-28 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer ">
      {children}
    </button>
  );
};

export default StyleButton;
