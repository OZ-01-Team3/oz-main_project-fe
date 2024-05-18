
import { XMarkIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  return (
    <>
      <div className="flex justify-between border-b-2 pr-1 border-b-mainWhite items-center w-full  h-12 search text-center relative focus:bg-mainBlack">
        <input
          type="search"
          className=" w-full  mx-auto  focus:border-transparent search-box text-mainWhite border border-transparent border-mainBlack bg-mainBlack focus:bg-mainBlack focus:border-mainBlack placeholder-subGray  " /* pl-10 추가하여 X 아이콘과 겹치지 않도록 함 */
          placeholder="브랜드, 상품, 프로필, 태그 등"

        />
        {/* X 버튼 추가 */}
        <XMarkIcon
          className="w-6  h-6 text-mainWhite  clear-search cursor-pointer "
        />
      </div>
    </>
  );
};
export default SearchBar;






