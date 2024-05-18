import ModalStyleButton from './ModalStyleButton';
import { ProductDetailResponseProps } from './ProductDetailResponse';
import ProductDetailTitle from './ProductDetailTitle';
const style = ['#모던', '#페미닌', '#가디건'];

const ProductDetailResDescription = ({ productDetails }: ProductDetailResponseProps) => {
  return (
    <>
      <div className="w-full text-mainBlack" key={productDetails.id}>
        <div className="flex flex-col pr-0 justify-center items-center mt-3 mx-auto">
          <div className="w-[450px] h-[450px]">
            <img
              src="https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pl-2 pr-2 py-2">
            {style.map(product => (
              <ModalStyleButton>{product}</ModalStyleButton>
            ))}
          </div>
          <h1 className="text-3xl font-bold  text-center my-4 w-96 ">{productDetails.title}</h1>
          <div className="flex flex-row justify-between text-mainBlack mb-2 pl-2 pr-2"></div>
        </div>
        <div className="w-[400px] m-auto">
          <ProductDetailTitle title="대여비" detail="8,000(1일)" />
          <ProductDetailTitle title="브랜드" detail={productDetails.brand} />
          <ProductDetailTitle title="사이즈" detail={productDetails.size} />
          <ProductDetailTitle title="구매시기" detail={productDetails.date} />
          <ProductDetailTitle title="상품상태" detail={productDetails.status} />
          <ProductDetailTitle title="상세설명" detail={productDetails.description} />
        </div>
        <div className=" m-auto  w-[400px] mt-24 pb-2">
          <p className="text-base font-semibold mt-8">옷장 주인</p>
          {/* 옷장주인 박스 */}
          <div className="flex flex-row p-1  justify-between items-center mb-9 border ">
            <div className="flex flex-row ">
              <img
                src="https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg"
                className="w-14 h-14 aspect-[1/1] mr-2"
              />
              <div className="flex flex-col justify-around  mx-auto">
                <p className="text-sm font-bold">하염빵</p>
                <p className="text-sm">대여중인 옷: 109개</p>
              </div>
            </div>
            <div className="border rounded-full border-mainBlack text-sm p-1 w-24 text-center hover:bg-mainBlack hover:text-mainWhite hover:cursor-pointer mr-3 ">
              옷장 구경하기
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailResDescription;
