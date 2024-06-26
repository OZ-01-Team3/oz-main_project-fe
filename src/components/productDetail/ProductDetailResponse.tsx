import { UserContext } from '@/App';
import chatRequests from '@/api/chatRequests';
import instance from '@/api/instance';
import useChatRoomStore from '@/stores/useChatRoomStore';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { product } from '../Products';
import ProductDetailResDescription from './ProductDetailResDescription';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
export interface ProductDetailResponseProps {
  productDetails: product;
}

interface NewChatRoomData {
  lender: number | undefined;
  product: string | undefined;
}

interface AxiosError {
  response?: {
    data: {
      msg: string;
    };
  };
}

const ProductDetailResponse = ({ productDetails }: ProductDetailResponseProps) => {
  const { userData } = useContext(UserContext);
  const logInUser = userData.email; //로그인한 유저
  const productRegUser = productDetails.lender.email; //상품 등록한 유저
  const productPk = productDetails.lender.pk; //상품 등록한 유저

  const { productId } = useParams(); // url에서 productId받아오기
  const navigate = useNavigate();

  const { chatRoomId } = useChatRoomStore();
  const { setDetailModalOpen } = useModalOpenStore();
  const { selectedProductId, setWillSelectedProductId } = useProductIdStore();

  const queryClient = useQueryClient();

  const prevPath = localStorage.getItem('pathname');

  // * 아이템을 선택해서 모달이 띄워지는게 아니라, 새로고침시 띄워질 경우,
  //  현재 경로에 따라서 all 이면 all 로 돌아오고 메인이면 메인으로 돌아가도록

  useEffect(() => {
    if (!selectedProductId) {
      setWillSelectedProductId(productId);
      setDetailModalOpen(true);
      if (prevPath === '/') {
        navigate('/', { replace: true });
      }
      if (prevPath === '/all') {
        navigate('/all', { replace: true });
      }
      if (prevPath === '/search') {
        navigate('/search', { replace: true });
      }
      if (prevPath === '/wish-list') {
        navigate('/wish-list', { replace: true });
      }
    }
  }, [productId, selectedProductId, setDetailModalOpen, setWillSelectedProductId]);

  // 모달 닫는 함수
  const handleCloseModal = () => {
    setDetailModalOpen(false);
    if (prevPath === '/') {
      navigate('/', { replace: true });
    }
    if (prevPath === '/all') {
      navigate('/all', { replace: true });
    }
    if (prevPath === '/search') {
      navigate('/search', { replace: true });
    }
    if (prevPath === '/wish-list') {
      navigate('/wish-list', { replace: true });
    }
    if (prevPath === '/mypage/sales-history') {
      navigate('/mypage/sales-history', { replace: true });
    }
    if (prevPath === '/mypage/my-closet') {
      navigate('/mypage/my-closet', { replace: true });
    }
    if (prevPath === '/mypage/order-history') {
      navigate('/mypage/order-history', { replace: true });
    }
    if (prevPath === '/mypage/sales-history') {
      navigate('/mypage/sales-history', { replace: true });
    }
  };

  // 채팅방 생성
  const handleCreateChatRoom = useMutation<NewChatRoomData, AxiosError, NewChatRoomData>({
    mutationFn: newChatRoomData => {
      return instance.post(VITE_BASE_REQUEST_URL + chatRequests.chat, newChatRoomData);
    },
    onSuccess: () => {
      // console.log('채팅방 생성성공');
      navigate(`/chat`);
      queryClient.invalidateQueries({ queryKey: ['chatList'] });
    },
    onError: (error: AxiosError) => {
      if (error.response?.data.msg === '이미 개설된 채팅방 내역이 존재합니다.') {
        navigate(`/chat`);
      }
      console.error('채팅방 생성에러', error);
    },
    onSettled: () => {
      console.log('결과에 관계없이 무언가 실행됨', chatRoomId);
      // // queryClient.invalidateQueries({ queryKey: ['chatList'] });
    },
  });

  // 함수 호출 시 데이터 전달
  const createChatRoom = () => {
    const newChatRoomData = {
      lender: productPk,
      product: productDetails?.uuid,
    };
    handleCreateChatRoom.mutate(newChatRoomData);
  };

  return (
    <>
      <div className="w-full  flex flex-col overflow-y-scroll justify-center items-center h-screen  lg:hidden xl:hidden">
        {/* 헤더 */}
        <div className="w-full bg-mainBlack h-16 font-didot text-white flex justify-center items-center text-2xl  ">
          Coaty Closet
          {/* 닫힘버튼 */}
          <XMarkIcon
            className="w-6 h-6 text-mainWhite absolute right-5 top-4 cursor-pointer"
            onClick={handleCloseModal}
          />
        </div>
        <div className="flex flex-col justify-start items-center bg-white relative w-full h-full   overflow-y-scroll rounded-none pb-5 ">
          <ProductDetailResDescription productDetails={productDetails} />
        </div>
        {logInUser === productRegUser ? (
          <button
            className="bg-mainBlack w-full text-mainWhite p-3  "
            onClick={() => {
              if (logInUser === '') {
                setDetailModalOpen(false);
                toast.info('로그인이 필요한 기능입니다');
                setTimeout(() => {
                  navigate('/sign-in');
                }, 100);

                return;
              }
              //바로 navigate 하면 모달이 안닫혀서 overflow:hidden 속성이 남아있어서 setTimeout 썻읍니다.
              setDetailModalOpen(false);
              setTimeout(() => {
                navigate(`/img-update/${productDetails.uuid}`, { state: productDetails.uuid });
              }, 100);
            }}
          >
            수정하기
          </button>
        ) : (
          <button
            className="bg-mainBlack w-full text-mainWhite p-3  "
            onClick={() => {
              setDetailModalOpen(false);
              if (logInUser === '') {
                setDetailModalOpen(false);
                toast.info('로그인이 필요한 기능입니다');

                // setTimeout(() => {
                //   navigate('/sign-in');
                // }, 100);

                return;
              }
              createChatRoom();
            }}
          >
            1:1 채팅
          </button>
        )}
      </div>
    </>
  );
};

export default ProductDetailResponse;
