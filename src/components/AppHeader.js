import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderToggler,
  CHeaderNav,
  CNavItem,
  CNavLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu,cilExitToApp } from '@coreui/icons'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#/login">
              <CIcon icon={cilExitToApp} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
    </CHeader>
  )
}

export default AppHeader
