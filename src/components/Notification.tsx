import { useNotificationContext } from '@/NotificationContext';
import useNotificationStore, { ChatNotificationItem, NotificationItemType } from '@/stores/useNotification';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonButton from './CommonButton';

interface ChatNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}
//* created_at을 시간으로 바꾸는 함수
function getTime(created_at: string) {
  const now = new Date();
  const date = new Date(created_at);
  const difference = now.getTime() - date.getTime();

  // 초 -> 분 -> 시간 -> 일로 바꾸기!!
  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 3) {
    // 4일 이상일때는 날짜로만 보여주기
    return date.toLocaleDateString();
  } else if (days > 0) {
    // 1,2,3일 지났을때는 1일전 이렇게
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return '방금 전';
  }
}
// notification에 닉네임이 있으면, ChatNotificationItem으로 타입정의
const isChatNotification = (notification: NotificationItemType): notification is ChatNotificationItem => {
  return (notification as ChatNotificationItem).nickname !== undefined;
};
const Notification = ({ isOpen, onClose }: ChatNotificationProps) => {
  const navigate = useNavigate();
  const notifications: NotificationItemType[] = useNotificationStore(state => state.notifications);
  const notificationContext = useNotificationContext();

  if (!notificationContext) {
    return null;
  }
  const { sendCommand } = notificationContext;
  // 알림 카테고리 담는 상태
  const [notificationsType, setNotificationsType] = useState('전체');
  // 알림 카테고리 별로 필터링
  const filterNotifications = notifications
    .filter(notification => {
      if (notificationsType === '전체') return true;
      if (notificationsType === '대여') return notification.type === 'rental_notification'; //대여
      if (notificationsType === '채팅') return notification.type === 'chat_notification'; //기타
      if (notificationsType === '기타') return notification.type === 'global_notification'; //기타

      return false;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });

  //* 알림 읽음처리하는 함수
  // 전체 알림읽음
  const handleConfirmAllNotifications = () => {
    notifications.map(item => sendCommand(`${item.type}_confirm`, item.id));
  };
  //하나하나 읽음처리
  const handleConfirmNotification = (id: number, type: string) => {
    if (type === 'global_notification' || 'rental_notification') {
      const command = `${type}_confirm`;
      sendCommand(command, id);
    }
  };
  // 헤더에서 알림버튼 눌렀을때 뒤에꺼 스크롤 안되게
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className=" relative w-full ">
      <div className=" fixed top-0 w-full h-full z-50 bg-modalBg">
        <div className="fixed top-0 right-0 z-50 w-[400px] md:w-full sm:w-full h-screen h-min-100vh bg-white p-4 overflow-auto">
          <XMarkIcon className=" w-6 text-mainBlack cursor-pointer" onClick={onClose} />
          <div className="flex justify-between items-center border-b-[1px] border-mainBlack pb-1 mt-4 px-2">
            <div className="flex justify-center items-center">
              <p className="text-mainBlack text-xl font-semibold mr-1 ">알림</p>
              {filterNotifications.length > 0 && (
                <div className="w-5 h-5 bg-mainBlack text-sm flex justify-center items-center rounded-full">
                  {filterNotifications.length}
                </div>
              )}
            </div>

            <p className="text-mainBlack font-thin text-sm cursor-pointer" onClick={handleConfirmAllNotifications}>
              전체 읽음
            </p>
          </div>
          <div className="flex my-3">
            <CommonButton
              onClick={() => setNotificationsType('전체')}
              className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer mr-1.5"
            >
              전체
            </CommonButton>
            <CommonButton
              onClick={() => setNotificationsType('대여')}
              className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer  mr-1.5"
            >
              대여
            </CommonButton>
            <CommonButton
              onClick={() => setNotificationsType('채팅')}
              className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer  mr-1.5"
            >
              채팅
            </CommonButton>
            <CommonButton
              onClick={() => setNotificationsType('기타')}
              className="border border-mainBlack text-mainBlack rounded-full py-1 px-1.5 w-16 text-center focus:bg-mainBlack focus:text-mainWhite hover:bg-mainBlack hover:text-mainWhite cursor-pointer "
            >
              기타
            </CommonButton>
          </div>
          <div className="flex flex-col">
            {filterNotifications.length === 0 ? (
              <p className="text-mainBlack font-semibold text-lg mb-2">새로운 알림이 없습니다.</p>
            ) : (
              <p className="text-mainBlack font-semibold text-lg mb-2">새로운 알림이 있습니다.</p>
            )}
            <ul role="list" className="w-auto divide-gray-200 ">
              {filterNotifications.map((notification, index) => (
                <li key={index} className="flex items-center cursor-pointer border-b border-gray-200 py-2 flex-col">
                  {/* 알림 온 시간, 읽음 div*/}
                  <div className="flex w-full items-center justify-between pr- pb-1">
                    <p className="text-xs text-subGray ">{getTime(notification.created_at)}</p>
                    <p
                      className="text-xs text-subGray"
                      onClick={() => handleConfirmNotification(notification.id, notification.type)}
                    >
                      읽음
                    </p>
                  </div>

                  {/* 정보 div */}
                  <div className="w-full h-20 flex items-center ">
                    <div className="mr-4">
                      {/* 메시지 아이콘 바깥 동그라미 */}
                      <div className="p-2 border-mainBlack border rounded-full flex justify-center items-center">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-9 h-9 text-mainBlack" />
                      </div>
                    </div>
                    {/* 알림상세내용 */}
                    <div className="flex flex-col justify-center w-full  h-full">
                      {/* 닉네임있으면 닉네임 보여주기 */}
                      {isChatNotification(notification) && (
                        <p className="font-semibold text-sm text-mainBlack">{notification.nickname}</p>
                      )}
                      {/* 알림 text */}
                      <p className="  text-sm  text-mainBlack">
                        {notification.text.length > 35 ? `${notification.text.substring(0, 35)}...` : notification.text}
                      </p>
                      {notification.type !== 'global_notification' && (
                        <p className="mt-1 text-xs  text-subGray" onClick={() => navigate('/chat')}>
                          채팅하기
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <img
                        src={notification.image}
                        alt={notification.image}
                        className="h-20 w-20 rounded-md object-cover object-center sm:h-20 sm:w-20 ml-4 "
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Notification;
