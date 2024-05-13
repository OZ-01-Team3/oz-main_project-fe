const authRequests = {
  signUp: '/accounts/signup/', // 회원가입
  login: '/accounts/login/', //로그인
  logout: '/accounts/logout/', // 로그아웃
  userInfo: '/accounts/user/', // 회원 정보조회, 수정, 일부수정
  // 토큰
  user_leave: '/accounts/token/verify/', //access token 유효성 검사
  refresh: '/accounts/token/refresh', // access token 재발급
  // 이메일 전송
  send_code: '/accounts/send-code/', // 이메일 코드 전송
  verify_email: '/accounts/confirm-email/', // 이메일 인증
};

export default authRequests;
