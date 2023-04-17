import classes from './logistics-item.module.css'
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
    icon: NextPage
    children: ReactNode
}

const LogisticsItem: NextPage<Props> = (props) => {
    const { icon: Icon } = props

    return (
        <li className={classes.item}>
            <span className={classes.icon}>
                <Icon />
            </span>
            <span className={classes.content}>{props.children}</span>
        </li>
    )
}

export default LogisticsItem
