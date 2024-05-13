import SearchWord from './SearchWord';

const style = ['#모던', '#페미닌', '#가디건'];

const History  = () => {
  return (
    
      <div className="w-full md:w-full ml-auto mr-auto mt-2">
        <div className="overflow-hidden">
          <span className=" text-xs font-normal text-mainWhite">최근 검색어</span>
          <button className=" ml-2 text-xs text-subGray" >
            전체삭제
          </button>
        </div>
        <ul className="flex mt-2">
          {style.map((product, index) => ( 
            <li className="overflow-hidden mb-2 relative text-mainWhite" key={index}>
              {/* 검색어에 모달 스타일 버튼 컴포넌트를 사용하여 스타일 적용 */}
              <SearchWord  key={product} >{product}</SearchWord>
              {/* 모달 내부에 있는 X 버튼 아이콘 */}
              
            </li>
          ))}
        </ul>
      </div>
  
  );
};

export default History;





