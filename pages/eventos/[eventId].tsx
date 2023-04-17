import Head from 'next/head'
import { Fragment } from 'react'
import EventSummary from '@/components/event-detail/event-summary'
import EventLogistics from '@/components/event-detail/event-logistics'
import EventContent from '@/components/event-detail/event-content'
import { getEventById, getFeaturedEvents } from '@/helpers/api-utils'
import { Event } from '@/types/events'
import { GetStaticProps, NextPage } from 'next'
import Comments from '@/components/input/comments'

interface Props {
    selectedEvent: Event
}

const EventDetailPage: NextPage<Props> = (props) => {
    const event = props.selectedEvent

    if (!event) {
        return (
            <div className="center">
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    )
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()

    const paths = events.map((event) => ({ params: { eventId: event.id } }))

    return {
        paths: paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<{
    selectedEvent: Event | undefined
}> = async (context) => {
    const eventId = context.params?.eventId

    if (eventId) {
        const event = await getEventById(eventId as string)

        return {
            props: {
                selectedEvent: event,
            },
        }
    } else {
        const event = await getEventById('e1')

        return {
            props: {
                selectedEvent: event,
            },
            revalidate: 30,
        }
    }
}

export default EventDetailPage
