import { PhotoIcon } from '@heroicons/react/16/solid';
const dragStyle = {
  box: 'bg-[#ebe9e935] w-full flex justify-center rounded-lg  border border-dashed border-[#FF5634] py-10 mt-5 ',
  img: 'mx-auto h-60 w-6h-60 text-gray-300 text-mainBlack ',
  text: 'mt-5  text-mainBlack',
};
const style = {
  box: 'w-full flex justify-center rounded-lg border border-dashed border-mainWhite py-10 mt-5',
  img: 'mx-auto h-60 w-6h-60 text-gray-300 ',
  text: 'mt-5',
};
const DetailImg = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <p className="">상품 이미지 등록</p>
      <div className={style.box}>
        <div className="text-center">
          <PhotoIcon className={style.img} aria-hidden="true" />
          <p className={style.text}>클릭하거나 파일을 여기에 드롭하여 선택하세요</p>
        </div>
      </div>
    </div>
  );
};

export default DetailImg;
