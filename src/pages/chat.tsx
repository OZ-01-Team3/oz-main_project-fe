
import ChatComponent from '@/components/chat/ChatComponent';
import ChatListsWithErrorBoundary from '@/components/chat/ChatLists';
import useChatRoomStore from '@/stores/useChatRoomStore';
import useMessageStore from '@/stores/useMessageStore';
import { useEffect, useRef } from 'react';

const { VITE_WEB_SOCKET } = import.meta.env;

class ChatSocket {
  webSocket: WebSocket | null = null;
  constructor(chatRoomId: number | null) {
    this.webSocket = new WebSocket(`${VITE_WEB_SOCKET}/chat/${chatRoomId}/`)

    // 웹소켓 연결
    this.webSocket.onopen = function () {
      console.log('웹소켓 연결 ^_^')
    }
    // 웹소켓 종료
    this.webSocket.onclose = (error) => {
      console.log('종료~', error)
    }
    // 웹 소켓 에러
    this.webSocket.onerror = function (error) {
      console.log('웹 소켓 에러', error);
    }

    // 웹소켓으로부터 메시지를 받았을 때 실행되는 함수
    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      // setMessage((prev) => [...prev, data]);
      useMessageStore.getState().addMessage(data)
      // console.log("온메세지에서 실시간 메세지 받았읍니다.", data)
    }
  }
  close() {
    this.webSocket?.close();
  }

  sendMessage(message) {
    this.webSocket?.send(JSON.stringify(message))
  }
}

const Chat = () => {
  let webSocketRef = useRef<ChatSocket | null>(null);
  const { chatRoomId } = useChatRoomStore()

  //페이지 이동시 웹소켓 종료
  useEffect(() => {
    return () => {
      webSocketRef.current?.close()
    }
  }, [])



  useEffect(() => {
    if (chatRoomId) {
      webSocketRef.current = new ChatSocket(chatRoomId);

      window.addEventListener('beforeunload', () => {
        webSocketRef.current?.close()
      })

      return () => {
        webSocketRef.current?.close()
      }
    }
  }, [chatRoomId])

  //메시지 전송 함수
  const sendMessage = (text: string, image: string, sender: string) => {
    if (!text.trim() && !image) {
      // 텍스트와 이미지가 모두 없는 경우 메시지를 보내지 않음
      return;
    }
    // if (webSocketRef.current) {
    //   webSocketRef.current.sendMessage(JSON.stringify({
    //     message,
    //     image,
    //   }));
    //   console.log("메세지 전송함수", message, "사진", image);
    // }



    webSocketRef.current?.sendMessage({ text, image, sender });
    // console.log("메세지 전송:", text, "사진:", image, "보내는 사람", sender)
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
          <div className="w-2/5 pl-3 pr-5 border-r-[1px] border-customGray overflow-y-scroll scrollbar-hide sm:w-28 sm:px-2  ">
            <ChatListsWithErrorBoundary webSocketRef={webSocketRef} />
          </div>
          {/* 채팅방 */}
          <ChatComponent sendMessage={sendMessage} webSocketRef={webSocketRef} />
        </div>
      </div>
    </>
  );
};

export default Chat;
