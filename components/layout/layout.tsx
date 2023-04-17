import { NextPage } from 'next'
import { Fragment, ReactNode, useContext } from 'react'
import MainHeader from '@/components/layout/main-header'
import Notification from '../ui/notification'
import { NotificationContext } from '@/store/notification-context'

interface Props {
    children: ReactNode
}

const Layout: NextPage<Props> = (props) => {
    const notificationCtx = useContext(NotificationContext)

    const activeNotification = notificationCtx?.notification

    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
            {activeNotification && (
                <Notification
                    title={activeNotification.title}
                    message={activeNotification.message}
                    status={activeNotification.status}
                />
            )}
        </Fragment>
    )
}

export default Layout
