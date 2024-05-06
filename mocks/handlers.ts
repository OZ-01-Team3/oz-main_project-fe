import { HttpResponse, http } from "msw";

export const handlers = [
  //회원가입
  http.post("/api/v1/members/register", async ({ request }) => {
    const info = await request.json();

    return HttpResponse.json(info, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  //테ㅛ스트룔
  http.get('/users', () => {
    // Response resolver allows you to react to captured requests,
    // respond with mock responses or passthrough requests entirely.
    // For now, let’s just print a message to the console.
    return HttpResponse.json({});
  }),
];
