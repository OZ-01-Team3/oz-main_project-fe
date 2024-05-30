
import { HeartIcon, HomeIcon, MagnifyingGlassIcon, Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


// interface ChatNotificationProps {
//   isOpen: boolean;
//   onClose: () => void;
// }


const MobileNave = () => {

  const navigate = useNavigate()
  // // 헤더에서 알림버튼 눌렀을때 뒤에꺼 스크롤 안되게 
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = '';
  //   }
  // }, [isOpen]);

  // if (!isOpen) return null;
  return (
    <div className="relative w-full">
      <div className="fixed bottom-0 right-0 z-50 w-full bg-white px-4 py-1.5 overflow-auto">
        <div className="flex justify-between">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/')}>
            <HomeIcon className=" w-8 h-8 text-mainBlack" />
            <p className="text-subGray text-xs font-thin">Home</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/wish-list')}>
            <HeartIcon className="w-8 h-8 text-mainBlack" />
            <p className="text-mainBlack text-xs font-thin">Whish list</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/search')}>
            <MagnifyingGlassIcon className="w-8 h-8 text-mainBlack" />
            <p className="text-mainBlack text-xs font-thin">Search</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => toast.info("준비중입니다")}>
            <Squares2X2Icon className="w-8 h-8 text-mainBlack" />
            <p className="text-mainBlack text-xs font-thin">My closet</p>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => navigate('/mypage/member-info')}>
            <UserCircleIcon className="w-8 h-8 text-mainBlack" />
            <p className="text-mainBlack text-xs font-thin">My page</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNave