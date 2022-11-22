import React, { useEffect } from 'react'
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
import { BtnSearshParticipant, DocsExample, BtnDeleteParticipant } from '../../components'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cilUser, cilSearch, cilBadge } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//TODO alterar busca de dados para utilizar as informações da api
import { getMatchById, updateMatch } from '../../utils/service/MatchService';
import { getAllUsers } from '../../utils/service/UserService';
import { deleteParticipant, registerParticipant } from '../../utils/service/ParticipantService';

const Event = () => {
  const [match, setMatch] = React.useState(undefined);
  const params = useParams()
  const [show, setShow] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [currentUsername, setCurrentUserName] = React.useState(undefined);

  const handleClose = () => {
    setSelectedUsers([]);
    setShow(false);
  }

  const getColor = (position) => {
    let color;
    switch (position) {
      case "PENDENT":
        color = 'warning'
        break;
      default:
        color = 'info';
    }
    return color;
  }

  const handleShow = (id, value) => {
    getAllUsers().then(result => {
      let users = result.data;
      let index = users.find(user => user.username == currentUsername);
      if(index != -1) {
        users.splice(index, 1);
      }
      
      setUsers(users);
      setShow(true);
    });
  }

  const getMatch = () => {
    getMatchById(params.id).then(result => {
      setMatch(result.data);
    });
  }

  useEffect(() => {
    setCurrentUserName(localStorage.getItem('user-name'));
    
    getMatchById(params.id).then(result => {
      setMatch(result.data);
    });
  });

  const getArrayVagas = (qtdParticipantes) => {
    if (match) {
      let size = qtdParticipantes - match.participants.length -1;
      var vagas = [];
      for (var i = 0; i < size; i++) {
        vagas.push({ vaga: 'Adicionar Participante' })
      }
      return vagas;
    }
  }

  const getAddressText = (address) => {
    if (address) {
      return address.street + ',' + ' ' + address.number + ', ' + address.district + ' - ' + address.city;
    }
  }

  const handleAddParticipant = () => {
    var promise = new Promise((resolve, regect) => {
      selectedUsers.forEach(selectedUser => {
        let participant = {
          name: selectedUser.name,
          phone: selectedUser.phone,
          match: match,
          status: 0
        };

        registerParticipant(participant).then(result => {
          match.participants.push(result.data);
          resolve(match);
        });
      });
    });

    promise.then(match => {
      updateMatch(match).then(result => {
        setShow(false);
        setSelectedUsers([]);
        getMatch();
      });
    });
  }

  const selectUser = (value, item) => {
    console.log(value);
    if (value.currentTarget.checked) {
      selectedUsers.push(item);
    } else {
      const index = selectedUsers.indexOf(item)
      selectedUsers.splice(index, 1)
    }
  }

  const clickDeleteParticipant = (id) => {
    deleteParticipant(id).then(result => {
      getMatch();
    });
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Partida</strong> <small>{match?.date}</small>
            </CCardHeader>
            <CCardBody>
              <h3>{match?.name}</h3>
              <p className="text-medium-emphasis small">
                {getAddressText(match?.address)}
              </p>
              <DocsExample href="components/card/#background-and-color">
                <CRow>
                  <CCol lg={4}>
                    <CCard color={'info'} textColor={'white'} className="mb-3">
                      <CCardHeader>{'Você'}</CCardHeader>
                      <CCardBody>
                        <CCardText style={{padding: '8px'}}>
                          <div class="btn-searsh-participant-container">
                            <CIcon icon={cilBadge} size="xl"/>
                          </div>
                        </CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                  {match?.participants?.map((item, index) => (
                    <CCol lg={4} key={index}>
                      <CCard color={getColor(item.status)} textColor={'white'} className="mb-3">
                        <CCardHeader>{item.status == 'PENDENT'? item.name + ' (Pendente)' : item.name}</CCardHeader>
                        <CCardBody>
                          <CCardText>
                              {match?.creator?.username == currentUsername? <BtnDeleteParticipant onClick={event => clickDeleteParticipant(item.id)}/> : <></>}
                          </CCardText>
                        </CCardBody>
                      </CCard>
                    </CCol>
                  ))}
                  {match?.creator?.username == currentUsername? getArrayVagas(match?.amountVacancies)?.map((item, index) => (
                    <CCol lg={4} key={index}>
                      <CCard color='success' textColor={'white'} className="mb-3">
                        <CCardHeader>Adicionar Participante</CCardHeader>
                        <CCardBody>
                          <BtnSearshParticipant onClick={event => handleShow()} />
                        </CCardBody>
                      </CCard>
                    </CCol>
                  )) : <></>}
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
              <CIcon icon={cilSearch} />
            </CButton>
          </CInputGroup>
          {users.map((item, index) => (
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
                    onChange={value => selectUser(value, item)}
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
          <Button variant="primary" onClick={handleAddParticipant}>
            Adicionar Participante
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Event
