import { HttpResponse, http } from 'msw';

export const handlers = [
  //회원가입
  http.post('/api/v1/members/register', async ({ request }) => {
    const info = await request.json();

    return HttpResponse.json(info, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),

  //로그인
  http.post('/api/v1/members/login', async ({ request }) => {
    const info = await request.json();
    console.log('로그인', info.name);

    const email = info?.email;
    const password = info.password;

    if (email === email && password === password) {
      return new HttpResponse(JSON.stringify(info), {
        status: 200,
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: 'authentication_failed',
      });
    }
  }),

  //전체 상품
  http.get('/api/v1/products', () => {
    return HttpResponse.json({
      items: [
        {
          id: 1,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          description: '가방 예뿌네잉',
          price: 43200,
        },
        {
          id: 2,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          description: '신발사세요 예뿌네잉',
          price: 43200,
        },
        {
          id: 3,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          description: '다리짧아보이는 바지',
          price: 43200,
        },
        {
          id: 4,
          image: 'https://image.msscdn.net/images/goods_img/20240226/3901296/3901296_17098728376352_320.jpg',
          title: '대충 치마',
          description: '똥꼬치마',
          price: 43200,
        },
        {
          id: 5,
          image: 'https://image.msscdn.net/images/goods_img/20240415/4054553/4054553_17134275558872_125.jpg',
          title: '세인트 피그먼트 반팔티',
          description: '안티티티티 프레즐먹고싶다',
          price: 43200,
        },
        {
          id: 6,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          description: '가방 예뿌네잉',
          price: 43200,
        },
        {
          id: 7,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          description: '신발사세요 예뿌네잉',
          price: 43200,
        },
        {
          id: 8,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          description: '다리짧아보이는 바지',
          price: 43200,
        },
      ],
    });
  }),

  //주문 이력
  http.get('/api/accounts/mypage/orders/', () => {
    return HttpResponse.json({
      orderProducts: [
        {
          id: 1,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          rental: '2024.05.01',
          return: '2024.05.08',
          remaining_date: '7',
        },
        {
          id: 2,
          image: 'https://image.msscdn.net/images/goods_img/20240216/3877002/3877002_17085052458926_500.jpg',
          title: '대충 셔츠',
          rental: '2024.05.01',
          return: '2024.05.08',
          remaining_date: '7',
        },
        {
          id: 3,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          rental: '2024.05.03',
          return: '2024.05.10',
          remaining_date: '7',
        },
        {
          id: 4,
          image: 'https://image.msscdn.net/images/goods_img/20240226/3901296/3901296_17098728376352_320.jpg',
          title: '대충 치마',
          rental: '2024.05.7',
          return: '2024.05.13',
          remaining_date: '6',
        },
        {
          id: 5,
          image: 'https://image.msscdn.net/images/goods_img/20240415/4054553/4054553_17134275558872_125.jpg',
          title: '세인트 피그먼트 반팔티',
          rental: '2024.04.01',
          return: '2024.04.04',
          remaining_date: '0',
        },
        {
          id: 6,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          rental: '2024.05.01',
          return: '2024.05.08',
          remaining_date: '0',
        },
        {
          id: 7,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          rental: '2024.05.01',
          return: '2024.05.08',
          remaining_date: '0',
        },
        {
          id: 8,
          image: 'https://image.msscdn.net/images/goods_img/20231004/3603458/3603458_16965720333230_500.jpg',
          title: '대충 가방',
          rental: '2024.05.01',
          return: '2024.05.08',
          remaining_date: '0',
        },
      ],
    });
  }),

  // 대여상품
  http.get('/api/order/', () => {
    return HttpResponse.json({
      rentalProducts: [
        {
          id: 1,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          description: '가방 예뿌네잉',
          rental: '2024.05.01',
          return: '2024.05.08',
          borrower: '섹시다이너마이트',
        },
        {
          id: 2,
          image: 'https://image.msscdn.net/images/goods_img/20240216/3877002/3877002_17085052458926_500.jpg',
          title: '대충 셔츠',
          description: '가방 예뿌네잉',
          rental: '2024.05.01',
          return: '2024.05.08',
          borrower: '하염빵',
        },
        {
          id: 3,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          description: '가방 예뿌네잉',
          rental: '2024.05.03',
          return: '2024.05.10',
          borrower: '빵용',
        },
        {
          id: 4,
          image: 'https://image.msscdn.net/images/goods_img/20240226/3901296/3901296_17098728376352_320.jpg',
          title: '대충 치마',
          description: '가방 예뿌네잉',
          rental: '2024.05.7',
          return: '2024.05.13',
          borrower: '이예솔하',
        },
        {
          id: 5,
          image: 'https://image.msscdn.net/images/goods_img/20240415/4054553/4054553_17134275558872_125.jpg',
          title: '세인트 피그먼트 반팔티',
          description: '가방 예뿌네잉',
          rental: '2024.04.01',
          return: '2024.04.04',
          borrower: '하이라이스',
        },
        {
          id: 6,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          description: '가방 예뿌네잉',
          rental: '2024.05.01',
          return: '2024.05.08',
          borrower: '전다니',
        },
        {
          id: 7,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          description: '가방 예뿌네잉',
          rental: '2024.05.01',
          return: '2024.05.08',
          borrower: '강계령',
        },
        {
          id: 8,
          image: 'https://image.msscdn.net/images/goods_img/20231004/3603458/3603458_16965720333230_500.jpg',
          title: '대충 가방',
          description: '가방 예뿌네잉',
          rental: '2024.05.01',
          return: '2024.05.08',
          borrower: '유경록',
        },
      ],
    });
  }),
  //상품등록
  http.post('/api/v1/products', async ({ request }) => {
    const info = await request.json();

    return HttpResponse.json(info, {
      status: 200,
    });
  }),
  //상품 이미지 등록
  http.post('/api/v1/products/img', async ({ request }) => {
    const info = await request.json();

    return HttpResponse.json(info, {
      status: 200,
    });
  }),
];
