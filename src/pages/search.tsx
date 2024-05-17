'use client';
import History from '@/components/search/History';
import SearchBar from '@/components/search/SearchBar';

const Search = () => {
  return (
    <div className='flex  flex-col items-center w-2/3 justify-center m-auto mt-10' >
      <SearchBar />
      <History />
    </div>
  );
};

export default Search;

