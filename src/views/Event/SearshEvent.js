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

const SearshEvent = () => {
    const [filter, setFilter] = React.useState({});
    const [filtered, setFiltered] = React.useState(false);
    const [sport, setSport] = React.useState(undefined);
    const [city, setCity] = React.useState(undefined);
    const [schedule, setSchedule] = React.useState(undefined);

    const getEvents = () => {
        return _events;
    }

    const getVagasRestantes = (item) => {
        let size = item.amountVacancies - item.participants.length;
        return size;
    }

    const handleSubmit = () => {
        let filter = {
            sport: sport,
            city: city,
            schedule: schedule
        };
        setFilter(filter);

        setFiltered(true);
    }

    const gotoFilter = () => {
        setFilter({});
        setFiltered(false);
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
                                <option value="FUTEBOL">Futebol</option>
                                <option value="VOLEI">Vôlei</option>
                                <option value="BEACH TENNIS">Beach Tenis</option>
                                <option value="BASQUETE">Basquete</option>
                                <option value="HANDBALL">Handball</option>
                                <option value="TÊNIS">Tênis</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel htmlFor="inputEmail4">Cidade</CFormLabel>
                            <CFormInput placeholder="Cidade" autoComplete="city" type="text" onChange={(event) => { setCity(event.target?.value) }} value={city} />
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
                {getEvents().map((item, index) => (
                    <CCol>
                        <CCard className="w-100">
                            <CCardBody>
                                <CCardTitle>{item.name}</CCardTitle>
                                <CRow>
                                    <CCol>
                                        <CCardText>
                                            Vagas restantes: {getVagasRestantes(item)}
                                        </CCardText>
                                        <CCardText>
                                            Data:  {item.date}
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
                                <CButton href="#">Juntar-se ao Evento</CButton>
                            </CCardBody>
                        </CCard>
                    </CCol>
                ))}
            </CRow>
        </>
    )
}

export default SearshEvent