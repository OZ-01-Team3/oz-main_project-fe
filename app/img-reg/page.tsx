import CommonButton from '@/components/CommonButton';
import Detailimg from '@/components/Detailimg';

const imgReg = () => {
  return (
    <>
      <div className="w-[600px] md:w-[400px] sm:w-[400px]  m-auto flex flex-col justify-center items-center mt-10 ">
        <Detailimg />
        <CommonButton className=" w-96 rounded-lg bg-mainWhite mt-5 py-3 font-semibold text-mainBlack shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
          다음
        </CommonButton>
      </div>
    </>
  );
};

export default imgReg;
