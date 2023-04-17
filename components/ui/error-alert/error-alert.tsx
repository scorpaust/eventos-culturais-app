import { NextPage } from 'next'
import { ReactNode } from 'react'
import classes from './error-alert.module.css'

interface Props {
    children: ReactNode
}

const ErrorAlert: NextPage<Props> = (props: Props | null) => {
    return <div className={classes.alert}>{props?.children}</div>
}

export default ErrorAlert
