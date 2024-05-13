'use client';
import SearchBar from '@/components/Search/SearchBar';
import History from '@/components/Search/History';

const SearchPage = () => {
  return (
    <div className='flex  flex-col items-center w-2/3 justify-center m-auto mt-10' >
      <SearchBar />
      <History   />
    </div>
  );
};

export default SearchPage;

