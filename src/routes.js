import React from 'react'

const Event = React.lazy(() => import('./views/Event/Event'))
const AddEvent = React.lazy(() => import('./views/Event/AddEvent'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/event/:id', exact: true, name: 'Detalhes do Usuário', element: Event },
    { path: '/new-event', exact: true, name: 'Cadastrar Evento', element: AddEvent}
]
export default routes