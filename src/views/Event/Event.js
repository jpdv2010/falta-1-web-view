import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
  CWidgetStatsF,
  CFormCheck,
  CInputGroup,
  CFormInput,
  CButton
} from '@coreui/react'
import { BtnSearshParticipant, DocsExample } from '../../components'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cilUser, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//TODO alterar busca de dados para utilizar as informações da api
import _events from '../../_events';
import _users from '../../_users'

const Event = () => {
  const params = useParams()
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    //TODO buscar eventos na api
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
    <>
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
                        <BtnSearshParticipant onClick={event => handleShow()}/>
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
    <Modal aria-labelledby="example-custom-modal-styling-title" dialogClassName="modal-50g" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Participantes disponíveis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CInputGroup className="mb-3">
            <CFormInput
              placeholder="Pesquisar Usuário"
              aria-label="Pesquisar Usuário"
              aria-describedby="button-addon2"
            />
            <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                <CIcon icon={cilSearch}/>
            </CButton>
        </CInputGroup>
        {_users.map((item,index) => (
            <CRow xs={24} sm={12} lg={6}>
              <CWidgetStatsF
                className="mb-3"
                icon={<CIcon width={24} icon={cilUser} size="xl" />}
                value={<CCol xs={12}>
                <CFormCheck
                  type="checkbox"
                  id="invalidCheck"
                  label={item.name}
                  required
                />
              </CCol>}
                color="info"
              />
              
            </CRow>
        ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Adicionar Participante
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Event
