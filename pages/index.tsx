import Head from 'next/head'
import { getFeaturedEvents } from '@/helpers/api-utils'
import EventList from '@/components/events/event-list'
import EventsSearch from '@/components/events/events-search'
import { useRouter } from 'next/router'
import { Event } from '@/types/events'
import { NextPage } from 'next'

interface Props {
    events: Event[]
}

const HomePage: NextPage<Props> = (props) => {
    const router = useRouter()

    function findEventsHandler(year: string, month: string) {
        const fullPath = `/eventos/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <>
            <Head>
                <title>Eventos Culturais</title>
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
            <div>
                <div>
                    <EventsSearch onSearch={findEventsHandler} />
                    <EventList events={props.events} />
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()

    return {
        props: {
            events: featuredEvents,
        },
        revalidate: 1800,
    }
}

export default HomePage
