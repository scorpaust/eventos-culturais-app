import {
    INotificationData,
    NotificationContextType,
} from '@/types/notifications'
import { NotificationContext } from '@/store/notification-context'
import { ReactNode, useState, useEffect } from 'react'

type Props = {
    children: ReactNode
}

function NotificationContextProvider({ children }: Props) {
    const [activeNotification, setActiveNotification] =
        useState<INotificationData | null>()

    useEffect(() => {
        if (
            activeNotification &&
            (activeNotification.status == 'success' ||
                activeNotification.status == 'error')
        ) {
            const timer = setTimeout(() => {
                setActiveNotification(null)
            }, 3000)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [activeNotification])

    function showNotificationHandler(notificationData: INotificationData) {
        setActiveNotification(notificationData)
    }

    function hideNotificationHandler() {
        setActiveNotification(null)
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
    }

    return (
        <>
            <NotificationContext.Provider value={context}>
                {children}
            </NotificationContext.Provider>
        </>
    )
}

export default NotificationContextProvider
