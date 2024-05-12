'use client';
import React, { useState } from 'react';
import SearchBar from '@/components/Search/SearchBar';
import History from '@/components/Search/History';

const SearchPage = () => {
  const [searches, setSearches] = useState<string[]>([]);

  const handleSearch = (term: string) => {
    // 검색어를 처리하는 로직 예시
    console.log('검색어:', term);
    setSearches(prevSearches => [term, ...prevSearches]);
  };

  const handleDelete = (index: number) => {
    setSearches(prevSearches => {
      const updatedSearches = [...prevSearches];
      updatedSearches.splice(index, 1);
      return updatedSearches;
    });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} onClearHistory={function (): void {
              throw new Error('Function not implemented.');
          } } />
      <History searches={searches} onDelete={handleDelete} />
    </div>
  );
};

export default SearchPage;

