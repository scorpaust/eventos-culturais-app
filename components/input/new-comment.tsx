import { useRef, useState } from 'react'
import classes from './new-comment.module.css'

type Props = {
    onAddComment: Function
}

function NewComment(props: Props) {
    const [isInvalid, setIsInvalid] = useState(false)

    const emailInputRef = useRef<HTMLInputElement>(null)
    const nameInputRef = useRef<HTMLInputElement>(null)
    const commentInputRef = useRef<HTMLTextAreaElement>(null)

    function sendCommentHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const enteredEmail = emailInputRef.current?.value as string
        const enteredName = nameInputRef.current?.value as string
        const enteredComment = commentInputRef.current?.value as string

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            enteredName.trim() === '' ||
            !enteredComment ||
            enteredComment.trim() === ''
        ) {
            setIsInvalid(true)
            return
        }

        props.onAddComment({
            email: enteredEmail,
            name: enteredName,
            text: enteredComment,
        })
    }

    return (
        <form className={classes.form} onSubmit={sendCommentHandler}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="email">O seu endereço eletrónico</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">O seu nome</label>
                    <input type="text" id="name" ref={nameInputRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor="comment">Comentário</label>
                <textarea
                    id="comment"
                    rows={5}
                    ref={commentInputRef}
                ></textarea>
            </div>
            {isInvalid && (
                <p>
                    Por favor, insira um endereço eletrónico válido e o
                    comentário!
                </p>
            )}
            <button>Enviar</button>
        </form>
    )
}

export default NewComment
