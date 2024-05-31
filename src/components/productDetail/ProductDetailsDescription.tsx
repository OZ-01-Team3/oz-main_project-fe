import { UserContext } from '@/App';
import chatRequests from '@/api/chatRequests';
import instance from '@/api/instance';
import { productStatusOptions } from '@/pages/products/productRegistration';
import useChatRoomStore from '@/stores/useChatRoomStore';
import { useModalOpenStore } from '@/stores/useModalStore';

import { useProductDetailStore } from '@/stores/useProductDetailStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { product } from '../Products';
import ProductDetailTitle from './ProductDetailTitle';
const { VITE_BASE_REQUEST_URL } = import.meta.env;
interface ProductDetailsDescriptionProps {
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

// 모달 오른쪽 부분 상세설명
const ProductDetailsDescription = ({ productDetails }: ProductDetailsDescriptionProps) => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { setDetailModalOpen } = useModalOpenStore();
  // console.log(userData);
  const logInUser = userData.email; //로그인한 유저
  const productRegUser = productDetails.lender.email; //상품 등록한 유저
  const productPk = productDetails.lender.pk; //상품 등록한 유저
  const queryClient = useQueryClient();
  const { chatRoomId } = useChatRoomStore();
  const { productDetail } = useProductDetailStore();
  // 상품 상태가 '4' 이렇게 숫자로 오는데, 이를 해당하는 id의 상태로 변환해주기
  const filteredStatus = productStatusOptions.find(
    productStatusOptions => productStatusOptions.id === Number(productDetails.condition)
  );
  const productRegistered = productDetails.lender;
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
  // console.log(productRegistered.profile_img);

  // 함수 호출 시 데이터 전달
  const createChatRoom = () => {
    const newChatRoomData = {
      lender: productPk,
      product: productDetails?.uuid,
    };
    handleCreateChatRoom.mutate(newChatRoomData);
  };

  // console.log(productDetail, '-상품정보데이터');

  const paragraphs = productDetails.description.split('\n');

  return (
    <div className="w-1/2 h-full sm:w-full flex flex-col justify-between">
      <div
        className="w-full aspect-[3/3.5]h-full overflow-y-scroll sm:overflow-visible scrollbar-hide text-mainBlack"
        key={productDetails.uuid}
      >
        <h1 className="text-3xl font-bold mb-6 ">{productDetails.name}</h1>
        <ProductDetailTitle title="사이즈" detail={productDetails.size} />
        <ProductDetailTitle title="브랜드" detail={productDetails.brand} />
        <ProductDetailTitle title="구매시기" detail={productDetails.purchase_date} />
        <ProductDetailTitle
          title="상품상태"
          detail={
            <>
              {filteredStatus && filteredStatus.label}
              <br />
              <span className="text-xs">{filteredStatus && filteredStatus.description}</span>
            </>
          }
        />
        <div>
          <p className="text-sm font-semibold mt-8 mb-1">상세설명</p>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm mb-2">
              {paragraph}
            </p>
          ))}
        </div>
        <div>
          <p className="text-base font-semibold mt-8 mb-1">옷장 주인</p>
          {/* 옷장주인 박스 */}
          <div className="flex flex-row w-full justify-between items-center mb-3">
            <div className="flex flex-row ">
              {productRegistered.profile_img ? (
                <img src={productRegistered.profile_img} className="w-14 object-cover aspect-[1/1] mr-2 rounded-full" />
              ) : (
                <UserCircleIcon className="w-14 h-14 mr-3 text-gray-300 " aria-hidden="true" />
              )}

              <div className="flex flex-col justify-around">
                <p className="text-sm font-bold">{productRegistered.nickname}</p>
                <p className="text-sm">대여중인 옷: 109개</p>
              </div>
            </div>
            <div
              className="border rounded-full  border-mainBlack text-sm p-2 w-28 text-center hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer"
              onClick={() => toast.info('준비중입니당^___^')}
            >
              옷장 구경하기
            </div>
          </div>
        </div>
      </div>
      {/* 현재 로그인 한 사용자와 상품을 등록한 사용자가 동일하면, 수정하기, 다르면 1:1 채팅버튼 */}

      {logInUser !== '' && logInUser === productRegUser ? (
        <button
          className="bg-mainBlack w-full text-mainWhite p-3 "
          onClick={() => {
            if (logInUser === '') {
              toast.info('로그인이 필요한 기능입니다');
              navigate('/sign-in');
              return;
            }
            setDetailModalOpen(false);
            //바로 navigate 하면 모달이 안닫혀서 overflow:hidden 속성이 남아있어서 setTimeout 썻읍니다.
            setTimeout(() => {
              navigate(`/img-update/${productDetails.uuid}`, { state: productDetails.uuid });
            }, 100);
          }}
        >
          수정하기
        </button>
      ) : (
        <button
          className="bg-mainBlack w-full text-mainWhite p-3 "
          onClick={() => {
            // 유저정보없을시에 로그인하도록
            if (logInUser === '') {
              toast.info('로그인이 필요한 기능입니다');
              navigate('/sign-in');
              return;
            }
            createChatRoom();
          }}
        >
          1:1 채팅
        </button>
      )}
    </div>
  );
};



export default ProductDetailsDescription;
