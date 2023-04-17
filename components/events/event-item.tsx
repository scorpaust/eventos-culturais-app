import { NextPage } from 'next'
import Button from '@/components/ui/button'
import Image from 'next/image'
import classes from './event-item.module.css'
import DateIcon from '@/components/icons/date-icon'
import AddressIcon from '@/components/icons/address-icon'
import ArrowIcon from '@/components/icons/arrow-right-icon'

interface Props {
    title: string
    image: string
    date: string
    location: string
    id: string
}

const EventItem: NextPage<Props> = ({ title, image, date, location, id }) => {
    const humanReadableDate = new Date(date).toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const formattedAddress = location.replace(', ', '\n')

    const exploreLink = `/eventos/${id}`

    return (
        <li className={classes.item}>
            <Image src={'/' + image} alt={title} width={250} height={160} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <div>
                        <h2>{title}</h2>
                    </div>
                    <div className={classes.date}>
                        <DateIcon />
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon />
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>
                        <span className={classes.icon}>
                            <ArrowIcon />
                        </span>
                        <span>Ver Evento</span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem
