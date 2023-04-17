import Link from 'next/link'
import { MouseEventHandler, PropsWithChildren, ReactNode } from 'react'
import classes from './button.module.css'

interface Props {
    link?: string
    children: ReactNode
}

function Button(props: Props | null) {
    if (props?.link) {
        return (
            <Link className={classes.btn} href={props.link}>
                {props.children}
            </Link>
        )
    } else {
        return <button className={classes.btn}>{props?.children}</button>
    }
}

export default Button
