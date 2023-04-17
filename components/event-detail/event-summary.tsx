import classes from './event-summary.module.css'
import { NextPage } from 'next'

interface Props {
    title: string
}

const EventSummary: NextPage<Props> = (props) => {
    const { title } = props

    return (
        <section className={classes.summary}>
            <h1>{title}</h1>
        </section>
    )
}

export default EventSummary
