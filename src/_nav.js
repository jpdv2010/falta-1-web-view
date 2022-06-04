import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Eventos',
  },
  {
    to: '/event/1',
    component: CNavItem,
    name: "Racha 12/06"
  },
  {
    to: '/event/2',
    component: CNavItem,
    name: "Racha dos amigos"
  },
  {
    to: '/event/3',
    component: CNavItem,
    name: "Sem idéia"
  }
]

export default _nav
