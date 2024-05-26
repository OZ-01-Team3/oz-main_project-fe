import { UserContext } from '@/App';
import { productStatusOptions } from '@/pages/mypage/productRegistration';
import { useModalOpenStore } from '@/stores/useModalStore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { product } from '../Products';
import ProductDetailTitle from './ProductDetailTitle';
interface ProductDetailsDescriptionProps {
  productDetails: product;
}
// 모달 오른쪽 부분 상세설명
const ProductDetailsDescription = ({ productDetails }: ProductDetailsDescriptionProps) => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const { setDetailModalOpen } = useModalOpenStore();

  const logInUser = userData.email; //로그인한 유저
  const productRegUser = productDetails.lender.email; //상품 등록한 유저

  // 상품 상태가 '4' 이렇게 숫자로 오는데, 이를 해당하는 id의 상태로 변환해주기
  const filteredStatus = productStatusOptions.find(
    productStatusOptions => productStatusOptions.id === Number(productDetails.condition)
  );
  return (
    <div className="w-1/2  pb-20 sm:w-full">
      <div
        className="w-full aspect-[3/3.5] h-full overflow-y-scroll sm:overflow-visible scrollbar-hide text-mainBlack"
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
          <p className="text-base font-semibold mt-8 mb-1">상세설명</p>
          <p className="text-sm">{productDetails.description}</p>
        </div>
        <div>
          <p className="text-base font-semibold mt-8 mb-1">옷장 주인</p>
          {/* 옷장주인 박스 */}
          <div className="flex flex-row w-full justify-between items-center mb-3">
            <div className="flex flex-row ">
              <img
                src="https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg"
                className="w-14 h-14 aspect-[1/1] mr-2"
              />
              <div className="flex flex-col justify-around">
                <p className="text-sm font-bold">하염빵</p>
                <p className="text-sm">대여중인 옷: 109개</p>
              </div>
            </div>
            <div className="border rounded-full  border-mainBlack text-sm p-2 w-28 text-center hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer">
              옷장 구경하기
            </div>
          </div>
        </div>
      </div>
      {/* 현재 로그인 한 사용자와 상품을 등록한 사용자가 동일하면, 수정하기, 다르면 1:1 채팅버튼 */}
      {logInUser === productRegUser ? (
        <button
          className="bg-mainBlack w-full text-mainWhite p-3 mt-3"
          onClick={() => {
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
        <button className="bg-mainBlack w-full text-mainWhite p-3 mt-3">1:1 채팅</button>
      )}
    </div>
  );
};

export default ProductDetailsDescription;
