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
import { cilLockLocked, cilUser } from '@coreui/icons'
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const AddEvent = () => {
    const [selectedDate, setSelectedDate] = React.useState(undefined);

    const handleDateChange = (value) => {
        setSelectedDate(value);
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
                        <CFormInput placeholder="Nome" autoComplete="name" />
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                        <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                        />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                        <CInputGroupText>
                            <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                            type="password"
                            placeholder="Repeat password"
                            autoComplete="new-password"
                        />
                    </CInputGroup>

                    <div className="d-grid">
                        <CButton color="success">Salvar</CButton>
                    </div>
                </CForm>
            </CContainer>
        </div>
    )
}

export default AddEvent