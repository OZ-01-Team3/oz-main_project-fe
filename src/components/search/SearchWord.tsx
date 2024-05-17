import { XMarkIcon } from '@heroicons/react/24/outline';
import { PropsWithChildren } from 'react';

function SearchWord({ children }: PropsWithChildren) {
  return <button className={style}>{children}
    <XMarkIcon
      className="ml-1 w-4 h-4 text-mainWhite cursor-pointer"
    />
  </button>;
}

export default SearchWord;
const style =
  'w-auto mr-1 flex justify-between items-center  border text-sm border-mainWhite bg-mainBlack text-mainWhite rounded-full pt-1 pb-1 pl-3 pr-3 w-20 mr-1 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer sm:bg-white md:bg-white  ';
