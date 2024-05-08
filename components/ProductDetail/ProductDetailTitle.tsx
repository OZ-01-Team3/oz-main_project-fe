interface PropsType {
  detail: string | any;
  title: string;
}
// 상세설명 부분이 중복되길래 따로 뺐어용
const ProductDetailTitle = ({ detail, title }: PropsType) => {
  return (
    <div className="flex flex-row  items-start text-center justify-between mt-5 ">
      <p className="text-sm font-semibold w-2/6 text-left">{title}</p>
      <p className="text-sm h-5 w-4/6 text-left">{detail}</p>
    </div>
  );
};

export default ProductDetailTitle;
