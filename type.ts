interface Message {
  profile_img: string | undefined;
  id: string;
  text: string;
  message: string;
  timestamp: string;
  nickname: string;
  image?: string;
  status: boolean;
  image_url?: string;
}

export default Message;
