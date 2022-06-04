import React from 'react'

const Event = React.lazy(() => import('./views/Event/Event'))

const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/event/:id', exact: true, name: 'Detalhes do Usuário', element: Event },
]
export default routes