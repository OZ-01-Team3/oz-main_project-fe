import React, { FC, useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  onClearHistory: () => void; 
}

const SearchBar: FC<SearchBarProps> = ({ onSearch, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <form className='px-36 text-center' onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <style>
        {`
          input::-ms-clear,
          input::-ms-reveal {
            display: none;
            width: 0;
            height: 0;
          }
          input::-webkit-search-decoration,
          input::-webkit-search-cancel-button,
          input::-webkit-search-results-button,
          input::-webkit-search-results-decoration {
            display: none;
          }
          .clear-search {
            background: none;
            border: none;
            color: #ccc;
            cursor: pointer;
          }
        `}
      </style>
      <div className="search text-center">
        <input
          type="search"
          className="w-9/12 md:w-full ml-auto mr-auto mt-20 foucs:outline-mainBlack search-box text-mainWhite border border-mainBlack bg-mainBlack focus:bg-mainBlack focus:border-mainBlack placeholder-subGray border-transparent"
          placeholder="브랜드, 상품, 프로필, 태그 등"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        {searchTerm !== '' && (
          <button type="button" className="clear-search align-middle" onClick={handleClearSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        )}
        
        <button type="submit" className="search-button">
          <span className="search-icon"></span>
        </button>
        <hr className="w-9/12 ml-auto mr-auto mt-0 mb-7 text-center text-hrGray" />
        <div className='flex items-left ml-36'>
          
        </div>
      </div>
    </form>
  );
};

export default SearchBar;




