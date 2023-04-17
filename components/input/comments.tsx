import { useContext, useEffect, useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'
import { NotificationContext } from '@/store/notification-context'

type Props = {
    eventId: string
}

type CommentData = {
    id: string
    email: string
    name: string
    text: string
}

function Comments(props: Props) {
    const { eventId } = props

    const [showComments, setShowComments] = useState(false)

    const [comments, setComments] = useState([])

    const [isFetchingComments, setIsFetchingComments] = useState(false)
    2

    const notificationCtx = useContext(NotificationContext)

    useEffect(() => {
        if (showComments) {
            setIsFetchingComments(true)
            fetch(`/api/comments/${eventId}`)
                .then((response) => response.json())
                .then((data) => {
                    setComments(data.comments)
                    setIsFetchingComments(false)
                })
        }
    }, [showComments])

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus)
    }

    function addCommentHandler(commentData: CommentData) {
        notificationCtx.showNotification({
            title: 'A enviar comentário...',
            message: 'O seu comentário está a ser enviado.',
            status: 'pending',
        })

        // send data to API
        fetch(`/api/comments/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }

                return response.json().then((data) => {
                    throw new Error(data.message || 'Erro inesperado...')
                })
            })
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Sucesso',
                    message: 'Comentário enviado.',
                    status: 'success',
                })
            })
            .catch((error) => {
                notificationCtx.showNotification({
                    title: 'Erro!',
                    message: error.message || -'Algo correu errado...',
                    status: 'error',
                })
            })
    }

    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Esconder' : 'Mostrar'} Comentários
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && !isFetchingComments && (
                <CommentList items={comments} />
            )}
            {showComments && isFetchingComments && <p>Carregando...</p>}
        </section>
    )
}

export default Comments
