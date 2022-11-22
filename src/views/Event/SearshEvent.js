import React from 'react'
import {
    CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CForm,
    CFormInput,
    CFormSelect,
    CFormLabel
} from "@coreui/react"
import _events from '../../_events';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import CIcon from '@coreui/icons-react';
import { cilFilter } from '@coreui/icons'
import { getMatchPage, updateMatch } from '../../utils/service/MatchService';
import { getUserByUsername } from '../../utils/service/UserService';
import { registerParticipant } from '../../utils/service/ParticipantService';
import { useNavigate } from 'react-router-dom';

const SearshEvent = () => {
    const [filtered, setFiltered] = React.useState(false);
    const [sport, setSport] = React.useState(undefined);
    const [matchName, setMatchName] = React.useState(undefined);
    const [schedule, setSchedule] = React.useState(undefined);
    const [events, setEvents] = React.useState(undefined);
    const navigate = useNavigate();

    const getVagasRestantes = (item) => {
        let size = item.amountVacancies - item.participants.length;
        return size;
    }

    const handleSubmit = () => {
        let filter = {
            sport: sport,
            matchName: matchName,
            schedule: schedule
        };

        getMatchPage(filter).then(result => {
            setEvents(result.data);
            setFiltered(true);
        })
        

    }

    const gotoFilter = () => {
        setSchedule(undefined);
        setMatchName(undefined);
        setSport(undefined);
        setFiltered(false);
    }

    const joinMatch = (match) => {
        let currentUserName = localStorage.getItem('user-name');
        getUserByUsername(currentUserName).then(result => {
            var promise = new Promise((resolve, regect) => {
                  let participant = {
                    name: result.data.name,
                    phone: result.data.phone,
                    match: match,
                    status: 1
                  };
          
                  registerParticipant(participant).then(result => {
                    match.participants.push(result.data);
                    resolve(match);
                  });
              });
          
              promise.then(match => {
                updateMatch(match).then(result => {
                    navigate('/event/' + match.id);
                });
              });
        });

    }

    return (
        <>
            {filtered ?
                <></> :
                <CCardBody>
                    <CForm onSubmit={(event) => handleSubmit(event)} className="row g-3">
                        <CCol md={3}>
                            <CFormLabel htmlFor="inputPassword4">Data</CFormLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={schedule}
                                    onChange={(value) => { setSchedule(value) }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
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
                            <CFormLabel htmlFor="inputEmail4">Nome</CFormLabel>
                            <CFormInput placeholder="Nome" autoComplete="matchName" type="text" onChange={(event) => { setMatchName(event.target?.value) }} value={matchName} />
                        </CCol>
                        <CCol xs={12}>
                            <CButton type="submit">Filtrar</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            }
            <CRow>
                {filtered? 
                <CRow>
                    <CCol md={4}>
                        <CButton onClick={event => gotoFilter()}><CIcon icon={cilFilter} size="lg" /></CButton>
                    </CCol>
                </CRow> : <></>
                }
                <div style={{paddingTop: '5px'}}/>
                {events?.map((item, index) => (
                    <CCol>
                        <CCard className="w-100">
                            <CCardBody>
                                <CCardTitle>{item.matchName}</CCardTitle>
                                <CRow>
                                    <CCol>
                                        <CCardText>
                                            Vagas restantes: {getVagasRestantes(item)}
                                        </CCardText>
                                        <CCardText>
                                            Data:  {item.schedule}
                                        </CCardText>
                                    </CCol>
                                    <CCol>
                                        <CCardText>
                                            Cidade: {item.address.city}
                                        </CCardText>
                                        <CCardText>
                                            Bairro:  {item.address.district}
                                        </CCardText>
                                    </CCol>
                                </CRow>
                                <CButton onClick={event => joinMatch(item)}>Juntar-se ao Evento</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ))}
            </CRow>
        </>
    )
}

export default SearshEvent