import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsExample } from '../../components'
import { useParams } from 'react-router-dom';

import _events from '../../_events';

const Event = () => {
  const params = useParams()

  console.log(params);

  const getPosition = (position) => {
    let p;
    switch(position) {
      case "A":
        p = "Atacante"
        break;
      case "M":
        p = "Meio-Campista"
        break;
      case "D":
        p = "Defensor"
        break;
      default:
        p = "Goleiro";
    }
    return p;
  }

  const getColor = (position) => {
    let color;
    switch(position) {
      case "A":
        color = 'danger'
        break;
      case "M":
        color = 'warning'
        break;
      case "D":
        color = 'success'
        break;
      default:
        color = 'info';
    }
    return color;
  }

  const getValue = (id, value) => {
    return _events.find(event => event.id == id)[value];
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Evento</strong> <small>{getValue(params.id, 'date')}</small>
          </CCardHeader>
          <CCardBody>
            <h3>{getValue(params.id, 'name')}</h3>
            <p className="text-medium-emphasis small">
              {getValue(params.id, 'description')}
            </p>
            <DocsExample href="components/card/#background-and-color">
              <CRow>
                {getValue(params.id, 'members').map((item, index) => (
                  <CCol lg={4} key={index}>
                    <CCard color={getColor(item.position)} textColor={'white'} className="mb-3">
                      <CCardHeader>{item.name}</CCardHeader>
                      <CCardBody>
                        <CCardTitle>{getPosition(item.position)}</CCardTitle>
                        <CCardText>
                          Descrição do Jogador.
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </DocsExample> 
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Event
