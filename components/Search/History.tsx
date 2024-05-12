import React, { FC } from 'react';

interface HistoryProps {
  searches: string[]; 
  onDelete: (index: number) => void;
}

const History: FC<HistoryProps> = ({ searches = [], onDelete }) => {
  return (
    <form className=' px-36'>
    <div className="p-4 w-9/12 md:w-full ml-auto mr-auto ">
      <div className="overflow-hidden">
        <span className=" float-left text-xs font-normal text-mainWhite">최근 검색어</span>
        <button className="float-left ml-2  text-xs text-subGray" onClick={() => onDelete(0)}>
          전체삭제
        </button>
      </div>
      <ul className="mt-2">
        {searches.map((search, index) => ( 
          <li className="overflow-hidden mb-2" key={index}>
            <span className="text-x font-normal border border-mainWhite rounded-full border">{search}  <button
              className="float-center text-mainwhite e ml-1 px-1  "
              onClick={() => onDelete(index)}
            >
              x
            </button></span>
          
          </li>
        ))}
      </ul>
    </div>
    </form>
  );
};

export default History;


