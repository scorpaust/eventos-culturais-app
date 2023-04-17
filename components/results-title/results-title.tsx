import { NextPage } from 'next'
import Button from '../ui/button'
import classes from './results-title.module.css'

interface Props {
    resultsDate: Date
}

const ResultsTitle: NextPage<Props> = (props: Props) => {
    const { resultsDate } = props

    const humanReadableDate = new Date(resultsDate).toLocaleDateString(
        'pt-PT',
        {
            month: 'long',
            year: 'numeric',
        }
    )

    return (
        <section className={classes.title}>
            <h1>Eventos de {humanReadableDate}</h1>
            <Button link="/eventos">Mostrar todos os eventos</Button>
        </section>
    )
}

export default ResultsTitle
