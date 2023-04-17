import {
    INotificationData,
    NotificationContextType,
} from '@/types/notifications'
import { createContext } from 'react'

export const NotificationContext = createContext<NotificationContextType>({
    notification: null,
    showNotification: function (notificationData: INotificationData) {},
    hideNotification: function () {},
})
