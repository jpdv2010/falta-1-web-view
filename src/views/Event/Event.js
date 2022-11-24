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
import { cilUser, cilSearch, cilBadge, cilFootball, cilTennisBall, cilBasketball } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//TODO alterar busca de dados para utilizar as informações da api
import { getMatchById } from '../../utils/service/MatchService';
import { getAllUsers, getUserByUsername } from '../../utils/service/UserService';
import { deleteParticipant, registerParticipant } from '../../utils/service/ParticipantService';

const Event = () => {
  const [match, setMatch] = React.useState(undefined);
  const params = useParams()
  const [show, setShow] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [currentUsername, setCurrentUserName] = React.useState(undefined);
  const [findUserField, setFindUserField] = React.useState(undefined);

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
      let index = users.findIndex(user => user.username == currentUsername);
      if(index != -1) {
        users.splice(index, 1);
      }

      match.participants.forEach(participant => {
        let index = users.findIndex(p => p.username == participant.username);
        if(index != -1) {
          users.splice(index, 1);
        }
      })
      
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
    if(params.id != match?.id) {
      getMatchById(params.id).then(result => {
        setMatch(result.data);
      });
    }
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
      if(selectedUsers.length > getArrayVagas(match?.amountVacancies).length) {
        setSelectedUsers([]);
        setShow(false);
        alert('Vagas insuficientes', 'danger');
      } else {
        selectedUsers.forEach(selectedUser => {
          let participant = {
            name: selectedUser.name,
            phone: selectedUser.phone,
            match: match,
            status: 0,
            username: selectedUser.username,
            matchname: match.matchName,
            matchid: match.id
          };
  
          registerParticipant(participant).then(result => {
            match.participants.push(result.data);
            setShow(false);
            setSelectedUsers([]);
            getMatch();
            resolve(match);
          });
        });
      }
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

  const clickFindUser = () => {
    if(!findUserField) {
      handleShow();
    } else {
      getUserByUsername(findUserField).then(result => {
        let users = [];
        users.push(result.data);
        setUsers(users);
      });
    }
  }

  const getIconBySport = (item) => {
    let icon;
    switch (item.sport) {
      case "SOCCER":
        icon = <CIcon icon={cilFootball} size="xl"/>
        break;
      case "VOLLEYBALL":
        icon = <CIcon icon={cilFootball} size="xl"/>
        break;
      case "BEACH_TENNIS":
        icon = <CIcon icon={cilFootball} size="xl"/>
        break;
      case "BASKETBALL":
        icon = <CIcon icon={cilBasketball} size="xl"/>
        break;
      case "HANDBALL":
        icon = <CIcon icon={cilFootball} size="xl"/>
        break;
      case "TENNIS":
        icon = <CIcon icon={cilTennisBall}  size="xl"/>
        break;
      default:
        icon = <CIcon icon={cilFootball} size="xl"/>
    }
    return icon;
  }

  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

  const alert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close"></button>',
          '</div>'
      ].join('')

      alertPlaceholder.append(wrapper)
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
                      <CCardHeader>{currentUsername == match?.creator.username? 'Você (Criador)' : match?.creator.name + ' (Criador)'}</CCardHeader>
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
                        <CCardHeader>{item.username == currentUsername? item.name + ' (Você)' : item.status == 'PENDENT'? item.name + ' (Pendente)' : item.name}</CCardHeader>
                        <CCardBody>
                          <CCardText>
                              {match?.creator?.username == currentUsername? <BtnDeleteParticipant onClick={event => clickDeleteParticipant(item.id)}/> : <CCardText style={{padding: '8px'}}><div class="btn-searsh-participant-container">{getIconBySport(match.sport)}</div></CCardText>}
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
              value={findUserField}
              onChange={event => setFindUserField(event.target?.value)}
            />
            <CButton type="button" color="secondary" variant="outline" id="button-addon2" onClick={event => clickFindUser()}>
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
