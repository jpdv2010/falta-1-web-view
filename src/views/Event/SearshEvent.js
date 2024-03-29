import React from 'react'
import {
    CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton, CForm,
    CFormInput,
    CFormSelect,
    CFormLabel
} from "@coreui/react"
import _events from '../../_events';

import CIcon from '@coreui/icons-react';
import { cilFilter } from '@coreui/icons'
import { getMatchCount, getMatchPage, updateMatch } from '../../utils/service/MatchService';
import { getUserByUsername } from '../../utils/service/UserService';
import { registerParticipant } from '../../utils/service/ParticipantService';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Alert, CustomDatePicker } from '../../components';

const SearshEvent = () => {
    const params = useParams();
    const [filtered, setFiltered] = React.useState(false);
    const [sport, setSport] = React.useState(undefined);
    const [matchName, setMatchName] = React.useState(undefined);
    const [schedule, setSchedule] = React.useState(new Date());
    const [events, setEvents] = React.useState(undefined);
    const navigate = useNavigate();
    const [searsh, setSearsh] = React.useState(false);
    const [pageList, setPageList] = React.useState([]);
    const [alertType, setAlertType] = React.useState('warning');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);

    const getVagasRestantes = (item) => {
        let size = item.amountVacancies - item.participants.length;
        return size;
    }

    const handleSubmit = () => {
        setSearsh(true);
        setFiltered(true)
        filter();
        navigate('/searsh-event/0');
    }
    
    const filter = () => {
        if(filtered == true) {
            let filter = {
                sport: sport,
                matchName: matchName,
                schedule: schedule,
                page: params.page,
                privateMatch: false,
                size: 5
            };
            
            getMatchCount(filter).then(countData => {
                let size = Math.ceil(countData.data / 5);
                var pages = [];
                for (var i = 0; i < size; i++) {
                    pages.push({ page: i + 1 })
                }
                setPageList(pages);

                getMatchPage(filter).then(result => {
                    setEvents(result.data);
                    setSearsh(false);
                })
            });
        }
    }

    const gotoFilter = () => {
        setSchedule(new Date());
        setMatchName(undefined);
        setSport(undefined);
        setFiltered(false);
    }

    useEffect(() => {
        if(searsh) {
            filter();
        }
    })

    const joinMatch = (match) => {
        let currentUserName = localStorage.getItem('user-name');
        let index = match.participants.findIndex(participant => participant.username == currentUserName);
        if(index != -1 || match.creator.username == currentUserName) {
            alert('Você já faz parte desta partida!', 'danger');
        } else {
            getUserByUsername(currentUserName).then(result => {
                var promise = new Promise((resolve, regect) => {
                      let participant = {
                        name: result.data.name,
                        phone: result.data.phone,
                        match: match,
                        status: 1,
                        username: currentUserName,
                        matchid: match.id,
                        matchname: match.matchName
                      };
              
                      registerParticipant(participant).then(result => {
                        match.participants.push(result.data);
                        navigate('/event/' + match.id, {state: { rld: true}});
                        resolve(match);
                      });
                  });
            });
        }
    }

    const isActive = (aPage) => {
        return aPage == params.page;
    }

    const alert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
    }

    return (
        <>
            {filtered ?
                <></> :
                <CCardBody>
                    <CForm onSubmit={(event) => handleSubmit(0)} className="row g-3">
                        <CCol md={3}>
                            <CFormLabel htmlFor="inputPassword4">Data</CFormLabel>
                            <CustomDatePicker value={schedule} onChange={(value) => { setSchedule(value) }} />
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
                <nav aria-label="...">
                    <ul class="pagination justify-content-center" style={{position: 'fixed', bottom: '0px'}}>
                        <li class={params.page == 0? "page-item disabled" : "page-item"} onClick={event => setSearsh(true)}>
                            <a class="page-link" href={'#/searsh-event/' + (params.page - 1)}>Anterior</a>
                        </li>
                        {pageList?.map((item, index) => (
                            <li class={isActive(index)? "page-item active" : "page-item"} onClick={event => setSearsh(true)}><a class="page-link" href={'#/searsh-event/' + index}>{item.page}</a></li>
                            ))}
                        <li class={params.page == pageList.length - 1? "page-item disabled" : "page-item"} onClick={event => setSearsh(true)}>
                            <a class="page-link" href={'#/searsh-event/' + (new Number(params.page) + 1)}>Próximo</a>
                        </li>
                    </ul>
                </nav>
            </CRow>
            <Alert showAlert={showAlert} alertType={alertType} alertMessage={alertMessage} setShowAlert={setShowAlert}></Alert>
        </>
    )
}

export default SearshEvent