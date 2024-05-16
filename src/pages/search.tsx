'use client';
import History from '@/components/Search/History';
import SearchBar from '@/components/Search/SearchBar';

const Search = () => {
  return (
    <div className='flex  flex-col items-center w-2/3 justify-center m-auto mt-10' >
      <SearchBar />
      <History />
    </div>
  );
};

export default Search;

