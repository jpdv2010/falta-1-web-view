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
import { cilMenu, cilExitToApp, cilBellExclamation, cilBell } from '@coreui/icons'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import _convites from '../_convites'

const AppHeader = () => {
  const [hasNotification, setHasNotification] = React.useState(true);
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
            <CNavLink>
              {!hasNotification ? <CIcon icon={cilBell} size="lg" /> :
                <OverlayTrigger
                  trigger="click"
                  key={'bottom'}
                  placement={'bottom'}
                  overlay={
                    <Popover id={`popover-positioned-${'bottom'}`}>
                      <Popover.Header as="h3">Convites</Popover.Header>
                      <Popover.Body>
                        {_convites.map((item, index) => (
                          <ul class="list-group">
                            <li class="list-group-item">
                              <h5>{item.name}</h5>
                              <h6>{item.invitedBy + ' te convidou para uma partida'}</h6>
                              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-success">To dentro!</button>
                                <button type="button" class="btn btn-danger">Fora!</button>
                              </div>
                            </li>
                          </ul>
                        ))}
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <CIcon icon={cilBellExclamation} color={'danger'} size="lg" />
                </OverlayTrigger>
              }
            </CNavLink>
          </CNavItem>

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
