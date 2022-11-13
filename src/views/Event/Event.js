import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from '@coreui/react'
import { BtnSearshParticipant, DocsExample } from '../../components'
import { useParams } from 'react-router-dom';

import _events from '../../_events';

const Event = () => {
  const params = useParams()

  console.log(params);

  // const getPosition = (position) => {
  //   let p;
  //   switch(position) {
  //     case "A":
  //       p = "Atacante"
  //       break;
  //     case "M":
  //       p = "Meio-Campista"
  //       break;
  //     case "D":
  //       p = "Defensor"
  //       break;
  //     default:
  //       p = "Goleiro";
  //   }
  //   return p;
  // }

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

  const getArrayVagas = (qtdParticipantes) => {
    let size = qtdParticipantes - getValue(params.id, 'participants').length;
    var vagas = [];
    for(var i = 0; i < size; i++) {
      vagas.push({vaga: 'Adicionar Participante'})
    }
    return vagas;
  }

  const getAddressText = (address) => {
    return address.street + ',' + ' ' + address.number + ', ' + address.district + ' - ' + address.city;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Partida</strong> <small>{getValue(params.id, 'date')}</small>
          </CCardHeader>
          <CCardBody>
            <h3>{getValue(params.id, 'name')}</h3>
            <p className="text-medium-emphasis small">
              {getAddressText(getValue(params.id, 'address'))}
            </p>
            <DocsExample href="components/card/#background-and-color">
              <CRow>
                {getValue(params.id, 'participants').map((item, index) => (
                  <CCol lg={4} key={index}>
                    <CCard color={getColor(item.position)} textColor={'white'} className="mb-3">
                      <CCardHeader>Participante</CCardHeader>
                      <CCardBody>
                        <CCardTitle>{item.name}</CCardTitle>
                        <CCardText>
                          Descrição do Jogador.
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
                {getArrayVagas(getValue(params.id, 'amountVacancies')).map((item, index) => (
                  <CCol lg={4} key={index}>
                    <CCard color='success' textColor={'white'} className="mb-3">
                      <CCardHeader>Adicionar Participante</CCardHeader>
                      <CCardBody>
                        <BtnSearshParticipant/>
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
