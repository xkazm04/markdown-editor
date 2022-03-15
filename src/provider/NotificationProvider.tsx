import { createContext, useContext, useState } from 'react';
import { NotificationType } from '../components/Notification/Notification';

interface NotificationContextType {
  notifications: NotificationType[] | [];
  addNotification: (type: NotificationType['type'], message: string) => void;
  deleteNotifications: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationProvider = (): NotificationContextType => {
  const [notifications, setNotifications] = useState<NotificationType[] | []>(
    []
  );

  const addNotification = (type: NotificationType['type'], message: string) => {
    setNotifications((prev) => [...prev, { type, message }]);
  };

  const deleteNotifications = () => {
    setNotifications([]);
  };

  return { notifications, addNotification, deleteNotifications };
};

export const useNotification = () => {
    return useContext(NotificationContext)
};
