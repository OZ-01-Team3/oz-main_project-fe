import instance from './instance';

const chatRequests = {
  chat: '/chat/', // 유저가 참여한 채팅방 리스트
};

export const chatListAPI = () => {
  return instance.get(chatRequests.chat);
};

export const chatRoomDeleteAPI = () => {
  return instance.delete(chatRequests.chat);
};
export default chatRequests;
