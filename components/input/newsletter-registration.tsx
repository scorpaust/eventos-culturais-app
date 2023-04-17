import { useContext, useRef } from 'react'
import classes from './newsletter-registration.module.css'
import { NotificationContext } from '@/store/notification-context'

function NewsletterRegistration() {
    const emailInputRef = useRef<HTMLInputElement>(null)

    const notificationCtx = useContext(NotificationContext)

    function registrationHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const enteredEmail = emailInputRef.current?.value

        notificationCtx.showNotification({
            title: 'Newsletter',
            message: 'Subscrevendo a newsletter...',
            status: 'pending',
        })

        if (enteredEmail) {
            fetch('/api/newsletter', {
                method: 'POST',
                body: JSON.stringify({ email: enteredEmail }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }

                    response.json().then((data) => {
                        throw new Error(data.message || 'Erro inesperado...')
                    })
                })
                .then((data) => {
                    notificationCtx.showNotification({
                        title: 'Sucesso',
                        message: 'Subscreveu, com sucesso, a nossa newsletter.',
                        status: 'success',
                    })
                })
                .catch((error) => {
                    notificationCtx.showNotification({
                        title: 'Erro!',
                        message: error.message || 'Algo não correu bem...',
                        status: 'error',
                    })
                })
        }
        return
    }

    return (
        <section className={classes.newsletter}>
            <h2>
                Registe-se para receber a nossa newsletter e mantenha-se
                atualizado/a!
            </h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        placeholder="O seu endereço eletrónico"
                        aria-label="O seu endereço eletrónico"
                    />
                    <button>Registar</button>
                </div>
            </form>
        </section>
    )
}

export default NewsletterRegistration
