const DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Krotiki - As Histórias Musicais',
        description:
            'Na quinta-feira, 6 de Abril, o projecto chamado Krotiki irá tocar no nosso palco. É uma mistura incrível de música acústica, guitarra e flauta, improvisação desenfreada, experiências electrónicas fascinantes e canções de autor com alma em línguas diferentes.',
        location: 'Malandro do Marquês, Rua Camilo Castelo Branco 23b, Lisboa',
        date: '2023-04-06',
        image: 'images/krotiki_malandro_marques.png',
        isFeatured: true,
    },
    {
        id: 'e2',
        title: 'Marta Alves - Fado Tradicional',
        description:
            'Neste concerto, o Fado apresenta-se na sua forma mais tradicional. Este é um momento de Fado e de conversas entre amigos. Poucas pessoas, um concerto intimista que, mais do que um concerto, é um momento de partilha de emoções.',
        location: 'Pavilhão Chinês, Rua Dom Pedro V 89/91, Lisboa',
        date: '2023-03-23',
        image: 'images/marta_alves_pav_chines.png',
        isFeatured: false,
    },
    {
        id: 'e3',
        title: 'Brother Firetribe + One Desire',
        description:
            'Duas superpotências do rock melódico uniram forças e estão prontas para levá-lo a uma aventura melódica. aventura rock durante toda a noite!',
        location: 'RCA Club, R. João Saraiva 18, 1700-249 Lisboa',
        date: '2023-04-06',
        image: 'images/firetribe_onedesire_rca.png',
        isFeatured: true,
    },
]

export function getFeaturedEvents() {
    return DUMMY_EVENTS.filter((event) => event.isFeatured)
}

export function getAllEvents() {
    return DUMMY_EVENTS
}

export function getFilteredEvents(dateFilter: any) {
    const { year, month } = dateFilter

    let filteredEvents = DUMMY_EVENTS.filter((event) => {
        const eventDate = new Date(event.date)
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        )
    })

    return filteredEvents
}

export function getEventById(id: string) {
    return DUMMY_EVENTS.find((event) => event.id === id)
}
