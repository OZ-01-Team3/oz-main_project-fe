import { create } from 'zustand';

interface Notification {
  global_notification?: GlobalNotificationItem[];
  rental_notification?: RentalNotificationItem[];
  chat_notification?: ChatNotificationItem[];
}
interface GlobalNotificationItem {
  confirm: boolean;
  created_at: string;
  id: number;
  text: string;
  image?: string;
  type: string;
}

interface RentalNotificationItem {
  borrow: string;
  created_at: string;
  id: number;
  lender: string;
  image?: string;
  product_name: string;
  recipient: number;
  rental_data: string;
  return_data: string;
  status: string;
  text: string;
  type: string;
}

export interface ChatNotificationItem {
  chatroom: number;
  id: number;
  image?: string;
  nickname: string;
  status: boolean;
  text: string;
  created_at: string;
  type: string;
}
export type NotificationItemType = ChatNotificationItem | RentalNotificationItem | GlobalNotificationItem;
interface NotificationState {
  notifications: NotificationItemType[];
  addListNotification: (notification: Notification) => void;
  confirmNotification: (id: number, type: string) => void;
  addNotification: (notification: NotificationItemType) => void;
}

const useNotificationStore = create<NotificationState>(set => ({
  // 알림 종류에 따라 담을 객체
  notifications: [],
  // 새로운 알림 있을 시, notifications배열에 추가
  addListNotification: (inputNotification: Notification) => {
    set(state => {
      const newNotifications: NotificationItemType[] = [...state.notifications];
      if (inputNotification.global_notification) {
        inputNotification.global_notification.forEach(global => newNotifications.push(global));
      }
      if (inputNotification.rental_notification) {
        inputNotification.rental_notification.forEach(rental => newNotifications.push(rental));
      }
      if (inputNotification.chat_notification) {
        inputNotification.chat_notification.forEach(chat => newNotifications.push(chat));
      }
      return { notifications: newNotifications };
    });
  },
  addNotification: (inputNotification: NotificationItemType) => {
    set(state => ({
      notifications: [...state.notifications, inputNotification],
    }));
  },
  confirmNotification: (id: number) => {
    set(state => ({
      notifications: state.notifications.map(notification =>
        notification.id === id ? { ...notification, confirm: true } : notification
      ),
    }));
  },
}));
export default useNotificationStore;
