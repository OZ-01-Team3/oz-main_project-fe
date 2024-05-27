import instance from '@/api/instance';
import useAuthStore from '@/stores/useAuthStore';
import useDebounce from '@/utils/UseDebounce';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { product } from '../Products';
const { VITE_BASE_REQUEST_URL } = import.meta.env;

export interface SearchProps {
  setProducts: (products: product[]) => void;
  setSearch: (search: boolean) => void;
}
const SearchBar = ({ setProducts, setSearch }: SearchProps) => {
  const { isLoggedIn } = useAuthStore();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      if (isLoggedIn) {
        const response = await instance.get(`/products/?search=${query}`);
        setProducts(response.data.results);
        setSearch(true);
      } else {
        const response = await axios.get(VITE_BASE_REQUEST_URL + `/products/?search=${query}`);
        setProducts(response.data.results);
        setSearch(true);
      }
    } catch (error) {
      console.error('검색실패', error);
    }
  };
  const searchDebounce = useDebounce(handleSearch, 500);
  useEffect(() => {
    searchDebounce();
  }, [query]);

  return (
    <>
      <div className="flex justify-between border-b-2 pr-1 border-b-mainWhite items-center w-full  h-12 search text-center relative focus:bg-mainBlack mb-32">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          className=" w-full  mx-auto  focus:border-transparent text-mainWhite border border-transparent border-mainBlack bg-mainBlack focus:bg-mainBlack focus:border-mainBlack placeholder-subGray  " /* pl-10 추가하여 X 아이콘과 겹치지 않도록 함 */
          placeholder="브랜드, 상품, 프로필, 태그 등"
        />
        <MagnifyingGlassIcon onClick={handleSearch} className="w-6  h-6 text-mainWhite  clear-search cursor-pointer " />
      </div>
    </>
  );
};
export default SearchBar;
