import { Event } from '@/types/events'
import { NextPage } from 'next'
import EventItem from '@/components/events/event-item'
import classes from './event-list.module.css'

interface Props {
    events?: Event[]
}

const EventList: NextPage<Props> = ({ events }) => {
    return (
        <ul className={classes.list}>
            {events?.map((event: Event) => (
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    image={event.image}
                />
            ))}
        </ul>
    )
}

export default EventList
