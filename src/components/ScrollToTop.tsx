import { ArrowUpIcon } from '@heroicons/react/24/outline';
const ScrollToTop = () => {
  return (
    <div
      className="fixed right-10 bottom-32 sm:right-4 group cursor-pointer"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="relative flex justify-center items-center">
        <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center transition-transform duration-500 ">
          {/* Rotate the icon on hover */}
          <ArrowUpIcon className="w-5 h-5 text-mainBlack" />
        </div>
      </div>
    </div>
  );
};

export default ScrollToTop;
