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
];
