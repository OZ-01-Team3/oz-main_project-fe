interface productsDetails {
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
const productsDetails = [
  {
    id: 1,
    image:
      "https://image.msscdn.net/images/goods_img/20240507/4108579/4108579_17151337802676_320.jpg",
    title: "로라로라 장원영 가디건 M사이즈1",
    size: "M",
    price: "10,000",
    brand: "로라로라",
    date: "2024년 3월",
    status: "사용감 적음",
    statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

    style: ["#모던", "#페미닌", "#가디건"],
    description:
      "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  },
  //   {
  //     id: 2,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈2",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],

  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈3",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],

  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈4",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],

  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈5",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],

  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈6",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],

  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 7,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈7",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],
  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
  //   {
  //     id: 8,
  //     image:
  //       "https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg",
  //     title: "로라로라 장원영 가디건 M사이즈8",
  //     size: "M",
  //     brand: "로라로라",
  //     date: "2024년 3월",
  //     status: "사용감 적음",
  //     statusDetail: "사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음",

  //     style: ["#모던", "#페미닌", "#가디건"],
  //     description:
  //       "   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요",
  //   },
];

export default productsDetails;
