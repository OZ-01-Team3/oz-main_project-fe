import instance from '@/api/instance';
import useAuthStore from '@/stores/useAuthStore';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

interface image {
  id: number;
  image: string;
}
export interface product {
  uuid: string;
  brand: string;
  condition: string;
  description: string;
  purchase_date: string;
  purchase_price: number;
  name: string;
  rental_fee: number;
  size: string;
  views: number;
  product_category: number;
  amount: number;
  region: string;
  images: image[];
  lender: lender;
  is_liked?: boolean;
  styles: number[];
}
interface lender {
  age?: number;
  email: string;
  nickname: string;
  pk: number;
}
export interface ProductProps {
  products: product[];
  setProducts: (products: product[]) => void;
}
const Products = ({ products, setProducts }: ProductProps) => {
  const { isLoggedIn } = useAuthStore();
  console.log(isLoggedIn);
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  useEffect(() => {
    if (detailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [detailModalOpen]);
  const { setSelectedProductId } = useProductIdStore();

  // 아이디 받아서 일치하면 isFavorite 바꿔주기
  const toggleFavorite = async (id: string) => {
    const selectedProductIndex = products.findIndex(product => product.uuid === id);
    if (selectedProductIndex === -1) return;

    const selectedProduct = products[selectedProductIndex];
    console.log('selectedProduct', selectedProduct && selectedProduct);
    console.log('selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
    //클릭한 상품의 is_liked 가 True 이면 delete 요청
    if (selectedProduct.is_liked) {
      try {
        const response = await instance.delete(`likes/${id}/`);
        console.log('좋아요삭제', response);
        console.log('selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
        const updatedProducts = products.map((product, idx) =>
          idx === selectedProductIndex ? { ...product, is_liked: false } : product
        );
        setProducts(updatedProducts);
      } catch (e) {
        console.log('좋아요 삭제 에러', e);
        console.log('selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
      }
    } else if (!selectedProduct.is_liked) {
      //클릭한 상품의 is_liked 가 False 이면 좋아요 요청
      try {
        const response = await instance.post(`likes/`, { product_id: id });
        console.log('좋아요등록', response);
        console.log('selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
        const updatedProducts = products.map((product, idx) =>
          idx === selectedProductIndex ? { ...product, is_liked: true } : product
        );
        setProducts(updatedProducts);
      } catch (e) {
        console.log('좋아요 등록 에러', e);
        console.log('selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
      }
    }
  };
  // 로그인 여부에 따라서 즐겨찾기 기능 구분
  const handleClickWishButton = (e, id: string) => {
    e.stopPropagation();
    if (isLoggedIn === true) {
      toggleFavorite(id);
    } else {
      toast.error('로그인이 필요한 기능입니다');
    }
  };
  const handleOpenModal = (id: string) => {
    setDetailModalOpen(true);
    setSelectedProductId(id);
    history.pushState({}, '', `/product/${id}`);
  };

  return (
    <>
      {products.length === 0 && <p className="text-center">상품이 존재하지 않습니다</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10 ">
        {products.map(product => (
          <div
            key={product.uuid}
            className="flex flex-col hover:cursor-pointer"
            onClick={() => handleOpenModal(product.uuid)}
          >
            {product.images.length > 0 && (
              <div className="aspect-[3/3.5]relative mb-2 ">
                <img src={product.images[0].image} className="w-full h-full object-cover  aspect-[3/3.5]" />
              </div>
            )}

            <div className="flex justify-between">
              <p className="font-bold text-base w-5/6">{product.name}</p>
              {product.is_liked ? (
                <FilledHeartIcon
                  className="w-6 h-6 text-red-500 hover:scale-110"
                  onClick={e => handleClickWishButton(e, product.uuid)}
                />
              ) : (
                <OutlineHeartIcon
                  className="w-6 h-6 hover:scale-110"
                  onClick={e => handleClickWishButton(e, product.uuid)}
                />
              )}
            </div>
            <p className="text-sm font-thin mt-1">
              {product.description && product.description.length > 39
                ? `${product.description.substring(0, 39)}...`
                : product.description}
            </p>
            <p className="text-sm mt-1">{Number(product.rental_fee).toLocaleString()}원 </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Products;
