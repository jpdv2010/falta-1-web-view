import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilCalendar, cilGroup } from '@coreui/icons'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ServiceContext from '../../utils/service/ServiceContext'

const AddEvent = () => {
    const [schedule, setSchedule] = React.useState(undefined);
    const [matchName, setMatchName] = React.useState("");
    const [amountVacancies, setAmountVacancies] = React.useState(0);
    const [sport, setSport] = React.useState(undefined);

    const saveEvent = () => {
        let event = {
            matchName: matchName,
            schedule: schedule,
            amountVacancies: amountVacancies,
            sport: sport
        };

        ServiceContext.registerMatch(event);
    }

    return (
        <div className="bg-light min-vh-50 d-flex flex-row align-items-center">
            <CContainer>
                <CForm>
                    <h1>Cadastrar Evento</h1>

                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                            <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Nome" autoComplete="name" onChange={(event) => {setMatchName(event.target?.value)}} value={matchName} />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                            <CIcon icon={cilCalendar} />
                        </CInputGroupText>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                value={schedule}
                                onChange={(value) => {setSchedule(value)}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                            <CIcon icon={cilGroup} />
                        </CInputGroupText>
                        <CFormInput
                            type="number"
                            placeholder="Quantidade de Participantes"
                            onChange={(event) => {setAmountVacancies(event.target?.value)}}
                        />
                    </CInputGroup>

                    <div className="d-grid">
                        <CButton color="success" onClick={saveEvent}>Salvar</CButton>
                    </div>
                </CForm>
            </CContainer>
        </div>
    )
}

export default AddEvent