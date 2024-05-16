interface PropsType {
  detail: string | any;
  title: string;
}
// 상세설명 부분이 중복되길래 따로 뺐어용
const ProductDetailTitle = ({ detail, title }: PropsType) => {
  return (
    <div className="flex flex-row  items-start text-center justify-center mt-5  sm:pl-5">
      <p className="text-sm font-semibold w-1/4 text-left md:text-base ">{title}</p>
      <p className="text-sm h-5 w-3/4 text-left md:text-base">{detail}</p>
    </div>
  );
};

export default ProductDetailTitle;
