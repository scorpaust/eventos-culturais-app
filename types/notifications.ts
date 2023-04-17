export interface INotificationData {
    title: string
    message: string
    status: string
}

export interface NotificationContextType {
    notification: INotificationData | null | undefined
    showNotification: Function
    hideNotification: Function
}
