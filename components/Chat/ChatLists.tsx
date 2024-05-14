'use client'
import chatRequests from "@/api/chatRequests";
import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import ChatLIst from './ChatLIst';
const ChatLists = () => {

  const ac = Cookies.get('ac')
  const [chatList, setChatList] = useState([])

  useEffect(() => {
    const fetchChatListData = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_REQUEST_URL + chatRequests.chat, {
          headers: {
            Authorization: `Bearer ${ac}`,
          },
        })
        console.log("채팅방 리스트", response.data)
        setChatList(response.data)
      } catch (error) {
        console.error('채팅방 리스트 불러오기 에러', error)
      }
    }
    fetchChatListData()
  }, [])
  return (
    <>
      {chatList.map((data) => (

        <ChatLIst
          key={data?.id}
          chatId={data?.id}
          user={data.user_info?.nickname}
          content={data.last_message?.text}
          time={data.last_message?.timestamp}
          product="https://image.msscdn.net/images/goods_img/20240102/3771106/3771106_17041841891976_320.jpg"
          profile="https://i.pinimg.com/564x/2a/58/e3/2a58e3d012bb65932a7c38d7381f29ee.jpg"
          message="2"
        />
      ))}

    </>
  );
};

export default ChatLists;
