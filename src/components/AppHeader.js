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
import { useEffect } from 'react'
import { deleteParticipant, getPendentParticipants, updateParticipant } from '../utils/service/ParticipantService'
import { getMatchById } from '../utils/service/MatchService'
import { useNavigate } from 'react-router-dom'

const AppHeader = () => {
  const [hasNotification, setHasNotification] = React.useState(false);
  const [convites, setConvites] = React.useState([]);
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate();

  useEffect(() => {
    let currentUserName = localStorage.getItem('user-name');
    getPendentParticipants(currentUserName).then(result => {
      if(result.data.length > 0) {
        setHasNotification(true);
      } else {
        setHasNotification(false);
      }
      setConvites(result.data);
    })
  })

  const accept = (item) => {
    getMatchById(item.matchid).then(result => {
      item.match = result.data;
      item.status = 1;
      updateParticipant(item, item.id).then(result => {
        navigate('/event/' + item.matchid, {state: { rld: true}});
      });
    });
  }

  const decline = (item) => {
    deleteParticipant(item.id)
  }

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
            <CNavLink style={{cursor: 'pointer'}}>
              {!hasNotification ? <CIcon icon={cilBell} size="lg" /> :
                <OverlayTrigger
                  trigger="click"
                  key={'bottom'}
                  placement={'bottom'}
                  overlay={
                    <Popover id={`popover-positioned-${'bottom'}`}>
                      <Popover.Header as="h3">Convites</Popover.Header>
                      <Popover.Body>
                        {convites.map((item, index) => (
                          <ul class="list-group">
                            <li class="list-group-item">
                              <h5>{item.matchname}</h5>
                              <h6>{'Você foi convidado para uma partida'}</h6>
                              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                <button type="button" class="btn btn-success" onClick={event => accept(item)}>To dentro!</button>
                                <button type="button" class="btn btn-danger" onClick={evend => decline(item)}>Fora!</button>
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
            <CNavLink href="#/logout">
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
