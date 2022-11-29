import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCol,
  CRow,
  CWidgetStatsF,
  CFormCheck,
  CInputGroup,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel
} from '@coreui/react'
import { BtnSearshParticipant, DocsExample, BtnDeleteParticipant, Alert, CustomDatePicker } from '../../components'
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { cilUser, cilSearch, cilFootball, cilTennisBall, cilBasketball } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

//TODO alterar busca de dados para utilizar as informações da api
import { getMatchById, updateMatch } from '../../utils/service/MatchService';
import { getAllUsers, getUserByUsername } from '../../utils/service/UserService';
import { deleteParticipant, registerParticipant } from '../../utils/service/ParticipantService';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import DateTimePicker from 'react-datetime-picker';

const Event = () => {
  const [match, setMatch] = useState(undefined);
  const params = useParams()
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentUsername, setCurrentUserName] = useState(undefined);
  const [findUserField, setFindUserField] = useState(undefined);
  const [alertType, setAlertType] = useState('warning');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [config, setConfig] = useState(false);

  const [schedule, setSchedule] = React.useState(new Date());
  const [matchName, setMatchName] = React.useState("");
  const [amountVacancies, setAmountVacancies] = React.useState(0);
  const [sport, setSport] = React.useState(undefined);
  const [city, setCity] = React.useState(undefined);
  const [district, setDistrict] = React.useState(undefined);
  const [street, setStreet] = React.useState(undefined);
  const [number, setNumber] = React.useState(undefined);
  const [zipCode, setZip] = React.useState(undefined);
  const [complement, setComplement] = React.useState(undefined);

  const navigate = useNavigate();

  fontawesome.library.add(faCrown,faCalendarDays);

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
      updateFormData(result.data);
    });
  }

  const updateFormData = (currentMatch) => {
      setSchedule(typeof currentMatch.schedule === "string"? new Date(currentMatch.schedule) : currentMatch.schedule);
      setMatchName(currentMatch.matchName);
      setAmountVacancies(currentMatch.amountVacancies);
      setSport(currentMatch.sport);
      setCity(currentMatch.address.city);
      setDistrict(currentMatch.address.district);
      setStreet(currentMatch.address.street);
      setNumber(currentMatch.address.number);
      setZip(currentMatch.address.zipCode);
      setComplement(currentMatch.address.complement);
  }

  useEffect(() => {
    setConfig(params['*'].includes('event/config'));
    setCurrentUserName(localStorage.getItem('user-name'));
    if(params.id != match?.id) {
      getMatchById(params.id).then(result => {
        setMatch(result.data);
        updateFormData(result.data);
      });
    }
  });

  const getArrayVagas = (qtdParticipantes) => {
    if (match) {
      let size = qtdParticipantes - match.participants?.length -1;
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

  const clickDeleteParticipant = (id, username) => {
    deleteParticipant(id).then(result => {
      if(currentUsername == username) {
        navigate('/dashboard', {state: { rld: true}});
      } else {
        getMatch();
      }
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

  const alert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
  }

  const handleSubmit = (event) => {
    let edittingMatch = {
      address: {}
    };
    edittingMatch.id = match.id;
    edittingMatch.schedule = schedule;
    edittingMatch.matchName = matchName;
    edittingMatch.amountVacancies = amountVacancies;
    edittingMatch.sport = sport;
    edittingMatch.address.city = city;
    edittingMatch.address.district = district;
    edittingMatch.address.street = street;
    edittingMatch.address.number = number;
    edittingMatch.address.zipCode = zipCode;
    edittingMatch.address.complement = complement;
    edittingMatch.creator = match.creator;
    
    updateMatch(edittingMatch).then(res => {
      getMatchById(res.data.id).then(editedMatch => {
        setMatch(editedMatch.data);
        navigate('/event/' + editedMatch.id, {state: { rld: true}});
      })
    }).catch(error => {
      alert(error.response.data.message, 'danger');
    });
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>{match?.matchName}</strong> <small>{match?.date}</small>
            </CCardHeader>
            <CCardBody>
              <h3>{match?.name}</h3>
              <p className="text-medium-emphasis small">
                {getAddressText(match?.address)}
              </p>
              <DocsExample href="components/card/#background-and-color" matchId={match?.id} isMatchCreator={match?.creator.username == currentUsername}>
                {config? 
                    <CCardBody>
                      <CForm onSubmit={(event) => handleSubmit(event)} className="row g-3">
                        <CCol md={6}>
                          <CFormLabel htmlFor="inputEmail4">Nome</CFormLabel>
                          <CFormInput placeholder="Nome" autoComplete="name" type="text" onChange={(event) => { setMatchName(event.target?.value) }} value={matchName} />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="inputPassword4">Data</CFormLabel>
                          <CustomDatePicker onChange={(value) => { setSchedule(value)}} value={schedule}></CustomDatePicker>
                        </CCol>
                        <CCol xs={3}>
                          <CFormLabel htmlFor="inputAddress">Quantidade de Participantes</CFormLabel>
                          <CFormInput
                            type="number"
                            placeholder="Quantidade de Participantes"
                            value={amountVacancies}
                            onChange={(event) => { setAmountVacancies(event.target?.value) }}
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormLabel htmlFor="inputState">Esporte</CFormLabel>
                          <CFormSelect id="inputGroupSelect01" onChange={(event) => { setSport(event.target?.value) }} value={sport} >
                            <option>Esporte...</option>
                            <option value="SOCCER">Futebol</option>
                            <option value="VOLLEYBALL">Vôlei</option>
                            <option value="BEACH_TENNIS">Beach Tenis</option>
                            <option value="BASKETBALL">Basquete</option>
                            <option value="HANDBALL">Handball</option>
                            <option value="TENNIS">Tênis</option>
                          </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="inputEmail4">Cidade</CFormLabel>
                          <CFormInput placeholder="Cidade" autoComplete="city" type="text" onChange={(event) => { setCity(event.target?.value) }} value={city} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="inputEmail4">Bairro</CFormLabel>
                          <CFormInput placeholder="Bairro" autoComplete="district" type="text" onChange={(event) => { setDistrict(event.target?.value) }} value={district} />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="inputEmail4">Rua</CFormLabel>
                          <CFormInput placeholder="Rua" autoComplete="street" type="text" onChange={(event) => { setStreet(event.target?.value) }} value={street} />
                        </CCol>
                        <CCol md={2}>
                          <CFormLabel htmlFor="inputEmail4">Número</CFormLabel>
                          <CFormInput placeholder="Número" autoComplete="number" type="number" onChange={(event) => { setNumber(event.target?.value) }} value={number} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="inputEmail4">Código Postal</CFormLabel>
                          <CFormInput placeholder="Código Postal" autoComplete="zipCode" type="text" onChange={(event) => { setZip(event.target?.value) }} value={zipCode} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="inputEmail4">Complemento</CFormLabel>
                          <CFormInput placeholder="Complemento" autoComplete="complement" type="text" onChange={(event) => { setComplement(event.target?.value) }} value={complement} />
                        </CCol>
                        <CCol xs={12}>
                          <CButton type="submit">Salvar</CButton>
                        </CCol>
                      </CForm>
                    </CCardBody> : <CRow>
                    <CCol lg={4}>
                      <CCard color={'info'} textColor={'white'} className="mb-3">
                        <CCardHeader>{currentUsername == match?.creator.username? 'Você (Criador)' : match?.creator.name + ' (Criador)'}</CCardHeader>
                        <CCardBody>
                          <CCardText style={{padding: '8px'}}>
                            <div class="btn-searsh-participant-container">
                              <FontAwesomeIcon icon="fa-crown" style={{width:'1.5rem', height:'1.5rem', fontSize:'1.5rem'}}/>
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
                                {match?.creator?.username == currentUsername || currentUsername == item.username? <BtnDeleteParticipant onClick={event => clickDeleteParticipant(item.id, item.username)}/> : <CCardText style={{padding: '8px'}}><div class="btn-searsh-participant-container">{getIconBySport(match.sport)}</div></CCardText>}
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
                }
              </DocsExample>
            </CCardBody>
          </CCard>
          <Alert showAlert={showAlert} alertType={alertType} alertMessage={alertMessage} setShowAlert={setShowAlert}></Alert>
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
