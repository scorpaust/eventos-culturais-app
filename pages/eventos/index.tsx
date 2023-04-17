import { getAllEvents } from '@/data/dummy-data'
import EventList from '@/components/events/event-list'
import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'
import { Event } from '@/types/events'
import NewsletterRegistration from '@/components/input/newsletter-registration'

interface Props {
    events: Event[]
}

const AllEventsPage: NextPage<Props> = (props) => {
    const { events } = props

    return (
        <div>
            <Head>
                <title>Todos os Eventos Culturais</title>
                <meta
                    name="description"
                    content="Aplicação para consulta de eventos culturais"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NewsletterRegistration />
            <EventList events={events} />
        </div>
    )
}

export const getStaticProps: GetStaticProps<{
    events: Event[] | undefined
}> = async () => {
    const events = await getAllEvents()

    return {
        props: {
            events: events,
        },
        revalidate: 60,
    }
}

export default AllEventsPage
