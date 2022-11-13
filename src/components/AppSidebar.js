import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CRow, CSidebar, CCol, CSidebarNav, CTooltip } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'
import { BtnAddEvent, BtnSearshEvent } from './index'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarNav>
        <CCol xs={12}>
          <SimpleBar>
            <AppSidebarNav items={navigation} />
          </SimpleBar>
          <CRow>
            <CTooltip
              content="Cadastrar Evento"
              placement="bottom"
            >
              <BtnAddEvent />
            </CTooltip>
            <CTooltip
              content="Pesquisar Evento"
              placement="bottom"
            >
              <BtnSearshEvent />
            </CTooltip>
          </CRow>
        </CCol>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)