import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useNotificationStore from './stores/useNotification';
const { VITE_WEB_SOCKET } = import.meta.env;
interface NotificationContextType {
  webSocketState: WebSocket | null;
  sendCommand: (command: string, notification_id: number) => void;
}

export const notificationContext = createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  return useContext(notificationContext);
};

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [webSocketState, setWebSocketState] = useState<WebSocket | null>(null);

  useEffect(() => {
    const webSocket = new WebSocket(`${VITE_WEB_SOCKET}/notification/`);
    webSocket.onopen = () => {
      console.log('웹소켓 연결.');
    };

    webSocket.onclose = event => {
      console.log('웹소켓 연결 종료.', event);
    };

    webSocket.onerror = error => {
      console.log('웹 소켓 에러.', error);
    };

    webSocket.onmessage = event => {
      const data = JSON.parse(event.data);
      toast.info('새로운 알림이 있습니다');

      if (data.type) {
        useNotificationStore.getState().addNotification(data);
      } else {
        useNotificationStore.getState().addListNotification(data);
      }

      console.log('새 알림.', data);
    };

    setWebSocketState(webSocket);

    return () => {
      webSocket.close();
    };
  }, []);
  const sendCommand = (command: any, notification_id: number) => {
    if (webSocketState && webSocketState.readyState === WebSocket.OPEN) {
      webSocketState.send(
        JSON.stringify({
          command: command,
          notification_id: notification_id,
        })
      );
    }
  };

  return (
    <notificationContext.Provider value={{ webSocketState, sendCommand }}>{children}</notificationContext.Provider>
  );
};
