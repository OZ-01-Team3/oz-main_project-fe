'use client';
import Chat from '@/components/Chat/Chat';
import ChatLists from '@/components/Chat/ChatLists';
import useChatRoomStore from '@/stores/chatRoomStore';
import Message from '@/type';
import { useEffect, useRef, useState } from 'react';

const page = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  let webSocket = useRef<WebSocket | null>(null);
  const { chatRoomId } = useChatRoomStore()

  //페이지 이동시 웹소켓 종료
  useEffect(() => {
    return () => {
      webSocket.current?.close()
    }
  }, [])

  // 컴포넌트 렌더링 될때마다 웹소켓 인스턴스 생성돼서 처음 마운트될때만 웹소켓 연결하기 위한.. 유즈이펙트.
  useEffect(() => {
    console.log("유즈이펙트안에 채팅아이디2", chatRoomId)
    webSocket.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatRoomId}/`)
    // 웹소켓 연결
    webSocket.current.onopen = function () {
      console.log('웹소켓 연결 ^_^')
    }
    // 웹소켓 종료
    webSocket.current.onclose = (error) => {
      console.log('종료~', error)
    }
    // 웹 소켓 에러
    webSocket.current.onerror = function (error) {
      console.log('웹 소켓 에러', error);
    }

    // 웹소켓으로부터 메시지를 받았을 때 실행되는 함수
    webSocket.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setMessages((prev) => [...prev, data]);
      console.log("메세지 받았읍니다.", data)
    }

    window.addEventListener('beforeunload', () => {
      webSocket.current?.close()
    })

    return () => {
      webSocket.current?.close()
    }
  }, [chatRoomId])

  //메시지 전송 함수
  const sendMessage = (message: string, image: string) => {
    if (webSocket.current) {
      webSocket.current.send(JSON.stringify({
        "message": message,
        "image": image
      }));
      console.log("메세지 전송함수", message, "사진", image);
    }
  }


  return (
    <>
      <div className="sm:w-full h-[calc(100vh-99.59px)] bg-white text-mainBlack xl:px-32 sm:px-5 md:px-10 lg:px-10 ">
        <div className="text-2xl pl-6 h-14 flex items-center font-semibold sm:justify-center md:justify-start">
          채팅
        </div>
        {/* 반반 나누는 레이아웃 */}
        <div className="flex  w-full h-[calc(100%-70px)] md:flex-row 2xl:flex-row ">
          {/* 채팅목록 */}
          <div className="w-2/5 pl-3 pr-5 border-r-[1px] border-gray overflow-y-scroll scrollbar-hide sm:w-28 sm:px-2   ">
            <ChatLists />
          </div>
          {/* 채팅방 */}
          <Chat sendMessage={sendMessage} messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </>
  );
};

export default page;
