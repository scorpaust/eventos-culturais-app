import { Key } from 'react'
import classes from './comment-list.module.css'

type Props = {
    items: Array<{
        _id: Key
        name: string
        email: string
        text: string
    }>
}

function CommentList(props: Props) {
    const { items } = props

    return (
        <ul className={classes.comments}>
            {items.map((item) => (
                <li key={item._id}>
                    <p>{item.text}</p>
                    <div>
                        Por <address>{item.name}</address>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default CommentList
