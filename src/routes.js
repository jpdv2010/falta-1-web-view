import React from 'react'

const Event = React.lazy(() => import('./views/Event/Event'))
const AddEvent = React.lazy(() => import('./views/Event/AddEvent'))
const SearshEvent = React.lazy(() => import('./views/Event/SearshEvent'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/event/:id', exact: true, name: 'Detalhes do Usuário', element: Event },
    { path: '/new-event', exact: true, name: 'Cadastrar Evento', element: AddEvent},
    { path: '/searsh-event', exact: true, name: 'Procurar Evento', element: SearshEvent}
]
export default routes