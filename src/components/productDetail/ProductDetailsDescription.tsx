import ProductDetailTitle from './ProductDetailTitle';
interface productsDetailsType {
  id: number;
  image: string;
  title: string;
  brand: string;
  size: string;
  date: string;
  status: string;
  style: string[];
  description: string;
  price: string;
}
interface ProductDetailsDescriptionProps {
  productDetails: productsDetailsType;
}
// 모달 오른쪽 부분 상세설명
const ProductDetailsDescription = ({ productDetails }: ProductDetailsDescriptionProps) => {
  return (
    <div className="w-1/2  pb-20 sm:w-full">
      <div
        className="w-full aspect-[3/3.5] h-full overflow-y-scroll sm:overflow-visible scrollbar-hide text-mainBlack"
        key={productDetails.id}
      >
        <h1 className="text-3xl font-bold mb-6 ">{productDetails.title}</h1>
        <ProductDetailTitle title="사이즈" detail={productDetails.size} />
        <ProductDetailTitle title="브랜드" detail={productDetails.brand} />
        <ProductDetailTitle title="구매시기" detail={productDetails.date} />
        <ProductDetailTitle
          title="상품상태"
          detail={
            <>
              {productDetails.status}
              <br />
              <span className="text-xs">(사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음)</span>
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
              {' '}
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
      <button className="bg-mainBlack w-full text-mainWhite p-3 mt-3">1:1 채팅</button>
    </div>
  );
};

export default ProductDetailsDescription;
