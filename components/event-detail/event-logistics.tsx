import AddressIcon from '../icons/address-icon'
import DateIcon from '../icons/date-icon'
import LogisticsItem from './logistics-item'
import classes from './event-logistics.module.css'
import { NextPage } from 'next'
import Image from 'next/image'

interface Props {
    date: string
    address: string
    image: string
    imageAlt: string
}

const EventLogistics: NextPage<Props> = (props: Props) => {
    const { date, address, image, imageAlt } = props

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
    const addressText = address.replace(', ', '\n')

    return (
        <section className={classes.logistics}>
            <ul className={classes.list}>
                <LogisticsItem icon={DateIcon}>
                    <time>{humanReadableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={AddressIcon}>
                    <address>{addressText}</address>
                </LogisticsItem>
            </ul>
            <div className={classes.image}>
                <Image
                    src={`/${image}`}
                    alt={imageAlt}
                    width={300}
                    height={300}
                />
            </div>
        </section>
    )
}

export default EventLogistics
