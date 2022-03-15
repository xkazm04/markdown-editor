import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNotification } from '../../provider/NotificationProvider';

export interface NotificationType {
  type: 'success' | 'error';
  message: string;
}

export const Notification = () => {
  const hideTimeout = 6000;
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const notificationStore = useNotification();

  const [open, setOpen] = useState(false);
  const hideTimer = useRef<any>(null);

  const hideAlert = useCallback(
    (timer: number) => {
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setOpen(false);
        notificationStore?.deleteNotifications();
      }, timer);
    },
    [notificationStore]
  );

  useEffect(() => {
    if (notificationStore!.notifications.length > 0) {
      const alerts = notificationStore!.notifications;
      const lastAlert = alerts[alerts.length - 1];
      setNotification(lastAlert);
      setOpen(true);
      hideAlert(hideTimeout);
    }
  }, [notificationStore, hideAlert]);

  return (
    <>
      {open && (
        <div
          className={`fixed bottom-10 flex justify-center left-[50%] max-w-lg text-lg p-6 transform -translate-x-[50%] font-semibold z-50 alert ${
            notification?.type === 'success' ? 'alert-success' : 'alert-error'
          }`}
        >
          <p>{notification?.message}</p>
        </div>
      )}
    </>
  );
};
