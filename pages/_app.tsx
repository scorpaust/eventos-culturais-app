import Layout from '@/components/layout/layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Fira_Sans } from 'next/font/google'
import Notification from '@/components/ui/notification'
import NotificationContextProvider from '@/store/notification-context-provider'

const fira = Fira_Sans({ weight: '400', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={fira.className}>
            <NotificationContextProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </NotificationContextProvider>
        </main>
    )
}
