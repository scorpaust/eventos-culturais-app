import { NextPage } from 'next'
import Button from '../ui/button'
import classes from '@/components/events/events-search.module.css'
import { FormEvent, useRef, MutableRefObject } from 'react'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

interface Props {
    onSearch: Function
}

const EventsSearch: NextPage<Props> = ({ onSearch }) => {
    const yearInputRef = useRef<HTMLSelectElement>(null)

    const monthInputRef = useRef<HTMLSelectElement>(null)

    function submitHandler(event: FormEvent) {
        event.preventDefault()

        const selectedYear =
            yearInputRef.current?.value === null
                ? '2021'
                : yearInputRef.current?.value

        const selectedMonth =
            monthInputRef.current?.value === null
                ? 'janeiro'
                : monthInputRef.current?.value

        onSearch(selectedYear, selectedMonth)
    }

    return (
        <div className={roboto.className}>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="year">Ano</label>
                        <select
                            id="year"
                            ref={yearInputRef}
                            className={roboto.className}
                        >
                            <option value="2021" className={roboto.className}>
                                2021
                            </option>
                            <option value="2022" className={roboto.className}>
                                2022
                            </option>
                            <option value="2023" className={roboto.className}>
                                2023
                            </option>
                        </select>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="month">Mês</label>
                        <select
                            id="month"
                            ref={monthInputRef}
                            className={roboto.className}
                        >
                            <option value="1" className={roboto.className}>
                                janeiro
                            </option>
                            <option value="2" className={roboto.className}>
                                fevereiro
                            </option>
                            <option value="3" className={roboto.className}>
                                março
                            </option>
                            <option value="4" className={roboto.className}>
                                abril
                            </option>
                            <option value="5" className={roboto.className}>
                                maio
                            </option>
                            <option value="6" className={roboto.className}>
                                junho
                            </option>
                            <option value="7" className={roboto.className}>
                                julho
                            </option>
                            <option value="8" className={roboto.className}>
                                agosto
                            </option>
                            <option value="9" className={roboto.className}>
                                setembro
                            </option>
                            <option value="10" className={roboto.className}>
                                outubro
                            </option>
                            <option value="11" className={roboto.className}>
                                novembro
                            </option>
                            <option value="12" className={roboto.className}>
                                dezembro
                            </option>
                        </select>
                    </div>
                </div>
                <Button>Encontrar Eventos</Button>
            </form>
        </div>
    )
}

export default EventsSearch
