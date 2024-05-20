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
  // http.post('/api/v1/members/login', async ({ request }) => {
  //   const info = await request.json();
  //   console.log('로그인', info.name);

  //   const email = info?.email;
  //   const password = info.password;

  //   if (email === email && password === password) {
  //     return new HttpResponse(JSON.stringify(info), {
  //       status: 200,
  //     });
  //   } else {
  //     return new HttpResponse(null, {
  //       status: 400,
  //       statusText: 'authentication_failed',
  //     });
  //   }
  // }),

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
          views: 3,
          created_at: '2024-05-13',
        },
        {
          id: 2,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          description: '신발사세요 예뿌네잉',
          price: 43200,
          views: 4,
          created_at: '2024-05-15',
        },
        {
          id: 3,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          description: '다리짧아보이는 바지',
          price: 43200,
          views: 5,
          created_at: '2024-05-16',
        },
        {
          id: 4,
          image: 'https://image.msscdn.net/images/goods_img/20240226/3901296/3901296_17098728376352_320.jpg',
          title: '대충 치마',
          description: '똥꼬치마',
          price: 43200,
          views: 6,
          created_at: '2024-05-13',
        },
        {
          id: 5,
          image: 'https://image.msscdn.net/images/goods_img/20240415/4054553/4054553_17134275558872_125.jpg',
          title: '세인트 피그먼트 반팔티',
          description: '안티티티티 프레즐먹고싶다',
          price: 43200,
          views: 7,
          created_at: '2024-05-13',
        },
        {
          id: 6,
          image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
          title: '옷정리합니다',
          description: '가방 예뿌네잉',
          price: 43200,
          views: 8,
          created_at: '2024-05-14',
        },
        {
          id: 7,
          image: 'https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg',
          title: '대충 신발신발',
          description: '신발사세요 예뿌네잉',
          price: 43200,
          views: 9,
          created_at: '2024-05-15',
        },
        {
          id: 8,
          image: 'https://image.msscdn.net/images/goods_img/20230412/3228764/3228764_17141243417273_320.jpg',
          title: '대충 바지',
          description: '다리짧아보이는 바지',
          price: 43200,
          views: 10,
          created_at: '2024-05-16',
        },
      ],
    });
  }),
  //상품상세
  http.get('/api/v1/products/:id', ({ params }) => {
    const { id } = params;

    // 가상의 제품 데이터베이스
    const products = [
      {
        id: 1,
        image: 'https://image.msscdn.net/images/goods_img/20240507/4108579/4108579_17151337802676_320.jpg',
        title: '로라로라 장원영 가디건',
        size: 'M',
        price: '10,000',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 2,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈2',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 3,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈3',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 4,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈4',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 5,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈5',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 6,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈6',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 7,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈7',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
      {
        id: 8,
        image: 'https://image.msscdn.net/images/goods_img/20240117/3800972/3800972_17071843073582_500.jpg',
        title: '로라로라 장원영 가디건 M사이즈8',
        size: 'M',
        brand: '로라로라',
        date: '2024년 3월',
        status: '사용감 적음',
        statusDetail: '사용은 했지만 눈에 띄는 흔적이나 얼룩이 없음',
        style: ['#모던', '#페미닌', '#가디건'],
        description:
          '   원영웅니가 입은 가디건입니다.2024년 1월에 구매했고 M사이즈입니다.소매 부분에 작은 얼룩이 있어요 원영웅니가 입은 가디건입니다.소매 부분에 작은 얼룩이 있어요',
      },
    ];
    // params로부터 받은 id에 해당하는 제품을 찾습니다.
    const product = products.find(product => product.id === Number(id));

    if (!product) {
      // 제품을 찾지 못한 경우, 에러 메시지를 반환합니다.
      return HttpResponse.json({ error: 'Product not found.' });
    }

    // 제품을 찾은 경우, 제품 정보를 반환합니다.
    return HttpResponse.json(product);
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
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return new HttpResponse('Missing document', { status: 400 });
    }

    if (!(file instanceof File)) {
      return new HttpResponse('Uploaded document is not a File', {
        status: 400,
      });
    }
    return HttpResponse.json({
      contents: await file.text(),
    });
  }),
];
