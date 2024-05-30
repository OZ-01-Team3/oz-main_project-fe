import { UserContext } from '@/App';
import instance from '@/api/instance';
import { useModalOpenStore, useProductIdStore } from '@/stores/useModalStore';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as FilledHeartIcon } from '@heroicons/react/24/solid';
import { QueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
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
  is_liked: boolean;
  styles: number[];
  likes: number;
}
export interface lender {
  age?: number;
  email: string;
  nickname: string;
  pk: number;
  profile_img: string;
}
export interface ProductProps {
  products: product[];
  setProducts?: (products: product[]) => void;
}
const Products = ({ products }: ProductProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const { isLoggedIn } = useContext(UserContext);
  const { detailModalOpen, setDetailModalOpen } = useModalOpenStore();
  const { setSelectedProductId } = useProductIdStore();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (detailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [detailModalOpen]);
  useEffect(() => {}, [isLiked]);
  // 아이디 받아서 일치하면 isFavorite 바꿔주기
  const toggleFavorite = async (id: string) => {
    const selectedProductIndex = products.findIndex(product => product.uuid === id);
    // 일치하는 인덱스를 찾아
    if (selectedProductIndex === -1) return; // 인덱스가 없으면 리턴해
    const selectedProduct = products[selectedProductIndex]; //선택된 상품.

    try {
      //클릭한 상품의 is_liked 가 True 이면 delete 요청
      if (selectedProduct.is_liked) {
        console.log('시작 selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
        try {
          const response = await instance.delete(`likes/${id}/`);
          console.log('좋아요삭제', response);
          selectedProduct.is_liked = false;

          queryClient.invalidateQueries({ queryKey: ['products'], type: 'active' });
          setIsLiked(prev => !prev);
          console.log('끝 selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);

          console.log(products);
        } catch (e) {
          console.log('좋아요 삭제 에러', e);
        }
      } else if (!selectedProduct.is_liked) {
        console.log('시작 selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
        //클릭한 상품의 is_liked 가 False 이면 좋아요 요청
        try {
          const response = await instance.post(`likes/`, { product_id: id });
          selectedProduct.is_liked = true;
          console.log('좋아요등록', response);
          console.log('끝 selectedProduct.is_liked', selectedProduct && selectedProduct.is_liked);
          queryClient.refetchQueries({ queryKey: ['products'], type: 'active' });
          setIsLiked(prev => !prev);
        } catch (e) {
          console.log('좋아요 등록 에러', e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 로그인 여부에 따라서 즐겨찾기 기능 구분
  const handleClickWishButton = (e, id: string) => {
    e.stopPropagation();
    if (isLoggedIn) {
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
      {/* {products && products.length === 0 && <p className="text-center">상품이 존재하지 않습니다</p>} */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-x-8 gap-y-12 w-full pb-10 ">
        {products &&
          products.map(product => (
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
                <div className="flex justify-center items-center h-6">
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
              </div>
              <p className="text-sm font-thin mt-1">
                {product.description && product.description.length > 39
                  ? `${product.description.substring(0, 39)}...`
                  : product.description}
              </p>
              <p className="text-sm mt-1">{Number(product.rental_fee).toLocaleString()}원 </p>{' '}
            </div>
          ))}
      </div>
    </>
  );
};
export default Products;
