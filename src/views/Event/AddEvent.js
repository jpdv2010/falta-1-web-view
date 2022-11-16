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
    CFormSelect,
    CFormLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
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
    const [city, setCity] = React.useState(undefined);
    const [district, setDistrict] = React.useState(undefined);
    const [street, setStreet] = React.useState(undefined);
    const [number, setNumber] = React.useState(undefined);
    const [zipCode, setZip] = React.useState(undefined);
    const [complement, setComplement] = React.useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let data = {
            matchName: matchName,
            schedule: schedule,
            creator: {},
            amountVacancies: amountVacancies,
            sport: sport,
            address: {
                city: city,
                district: district,
                street: street,
                number: number,
                zipCode: zipCode,
                complement: complement
            }
        };

        ServiceContext.registerMatch(data)
            .then(res => {
            }).catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className="bg-light min-vh-50 d-flex flex-row align-items-center">
            <CCardBody>
                <h1>Cadastrar Partida</h1>
                <CForm onSubmit={(event) => handleSubmit(event)} className="row g-3">
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Nome</CFormLabel>
                        <CFormInput placeholder="Nome" autoComplete="name" type="text" onChange={(event) => {setMatchName(event.target?.value)}} value={matchName} />
                    </CCol>
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
                                onChange={(value) => {setSchedule(value)}}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </CCol>
                    <CCol xs={3}>
                        <CFormLabel htmlFor="inputAddress">Quantidade de Participantes</CFormLabel>
                        <CFormInput
                            type="number"
                            placeholder="Quantidade de Participantes"
                            onChange={(event) => {setAmountVacancies(event.target?.value)}}
                        />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputState">Esporte</CFormLabel>
                        <CFormSelect id="inputGroupSelect01" onChange={(event) => {setSport(event.target?.value)}} value={sport} >
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
                        <CFormInput placeholder="Cidade" autoComplete="city" type="text" onChange={(event) => {setCity(event.target?.value)}} value={city} />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Bairro</CFormLabel>
                        <CFormInput placeholder="Bairro" autoComplete="district" type="text" onChange={(event) => {setDistrict(event.target?.value)}} value={district} />
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="inputEmail4">Rua</CFormLabel>
                        <CFormInput placeholder="Rua" autoComplete="street" type="text" onChange={(event) => {setStreet(event.target?.value)}} value={street} />
                    </CCol>
                    <CCol md={2}>
                        <CFormLabel htmlFor="inputEmail4">Número</CFormLabel>
                        <CFormInput placeholder="Número" autoComplete="number" type="number" onChange={(event) => {setNumber(event.target?.value)}} value={number} />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Código Postal</CFormLabel>
                        <CFormInput placeholder="Código Postal" autoComplete="zipCode" type="text" onChange={(event) => {setZip(event.target?.value)}} value={zipCode} />
                    </CCol>
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Complemento</CFormLabel>
                        <CFormInput placeholder="Complemento" autoComplete="complement" type="text" onChange={(event) => {setComplement(event.target?.value)}} value={complement} />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Salvar</CButton>
                    </CCol>
                </CForm>
            </CCardBody>
        </div>
    )
}

export default AddEvent