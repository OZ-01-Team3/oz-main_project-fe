import { toast } from 'react-toastify';

const EventBanner = () => {
  return (
    <div className="h-96 sm:mb-52 sm:mt-20 md:mb-52 md:mt-20 mb-20">
      <p className="text-2xl mb-4 font-didot">EVENT</p>
      <div className="w-full grid grid-cols-2  gap-x-3  md:flex md:flex-col md:h-56 sm:h-56 sm:flex sm:flex-col">
        <div
          className="bg-customGray w-full h-full object-contain sm:mb-3 md:mb-3"
          onClick={() => toast.info('준비중입니다 !')}
        >
          <img src="../../public/images/eventBanner.png" className="w-full h-80  md:h-56 sm:h-56 object-cover" />
        </div>
        <div className="bg-customGray w-full h-ful">
          <img
            src="../../public/images/eventBanner2.png"
            className="w-full h-80  md:h-56 sm:h-56 object-cover"
            onClick={() => toast.info('준비중입니다 !')}
          />
        </div>
      </div>
    </div>
  );
};

export default EventBanner;
