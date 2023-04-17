import EventList from '@/components/events/event-list'
import Head from 'next/head'
import ResultsTitle from '@/components/results-title/results-title'
import Button from '@/components/ui/button'
import ErrorAlert from '@/components/ui/error-alert/error-alert'
import { getFilteredEvents } from '@/data/dummy-data'
import { Event } from '@/types/events'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

interface Props {
    hasError: false
    events: Event[]
    date: { year: number; month: number }
}

const FilteredEventsPage: NextPage<Props> = (props) => {
    let pageHeadData = (
        <Head>
            <title>Eventos Filtrados</title>
            <meta
                name="description"
                content={`Uma lista de eventos filtrados para o mês ${props.date.month} do ano ${props.date.year}`}
            />
        </Head>
    )

    if (props.hasError) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Filtros de pesquisa inválidos. Por favor, ajuste-os.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/eventos">Mostrar todos os eventos</Button>
                </div>
            </Fragment>
        )
    }

    if (!props.events || props.events.length == 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>
                    <p>Eventos não encontrados para a pesquisa efetuada.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link="/eventos">Mostrar todos os eventos</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(props.date.year, props.date.month - 1)

    return (
        <div>
            <Head>
                <title>Eventos Filtrados</title>
                <meta
                    name="description"
                    content={`Todos os eventos a ${props.date.month}/${props.date.year}`}
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ResultsTitle resultsDate={date} />
            <EventList events={props.events} />
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params } = context

    if (params) {
        const filterData = params.slug

        if (filterData) {
            const filteredYear = filterData[0]

            const filteredMonth = filterData[1]

            const numYear = +filteredYear

            const numMonth = +filteredMonth

            if (
                isNaN(numYear) ||
                isNaN(numMonth) ||
                numYear > 2023 ||
                numYear < 2021 ||
                numMonth < 1 ||
                numMonth > 12
            ) {
                return {
                    props: {
                        events: undefined,
                        hasError: true,
                        date: undefined,
                    },
                }
            } else {
                const filteredEvents = await getFilteredEvents({
                    year: numYear,
                    month: numMonth,
                })

                if (filteredEvents) {
                    return {
                        props: {
                            events: filteredEvents,
                            hasError: false,
                            date: {
                                year: numYear as number,
                                month: numMonth as number,
                            },
                        },
                    }
                } else {
                    return {
                        props: {
                            events: undefined,
                            hasError: true,
                            date: undefined,
                        },
                    }
                }
            }
        }
    }
}

export default FilteredEventsPage
