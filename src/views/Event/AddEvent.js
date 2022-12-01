import React from 'react'
import {
    CButton,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CFormSelect,
    CFormLabel,
    CFormSwitch
} from '@coreui/react'
import { registerMatch } from '../../utils/service/MatchService';
import { getUserByUsername } from '../../utils/service/UserService';
import { useNavigate } from 'react-router-dom';
import { Alert, CustomDatePicker } from '../../components';

const AddEvent = () => {
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
    const [alertType, setAlertType] = React.useState('warning');
    const [alertMessage, setAlertMessage] = React.useState('');
    const [showAlert, setShowAlert] = React.useState(false);
    const [privateMatch, setPrivateMatch] = React.useState(new Boolean(false));
    const [whatsappGroupLink, setWhatsappGroupLink] = React.useState(undefined);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let currentUserName = localStorage.getItem('user-name');        

        getUserByUsername(currentUserName).then(response => {
            let data = {
                matchName: matchName,
                schedule: schedule,
                creator: response.data,
                amountVacancies: amountVacancies,
                sport: sport,
                privateMatch: privateMatch,
                whatsappGroupLink: whatsappGroupLink,
                address: {
                    city: city,
                    district: district,
                    street: street,
                    number: number,
                    zipCode: zipCode,
                    complement: complement
                }
            };
    
            registerMatch(data)
                .then(res => {
                    navigate('/event/' + res.data.id, {state: { rld: true}});
                }).catch(function (error) {
                    alert(error.response.data.message, 'danger');
                })
        })
    }

    const alert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
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
                    <CCol md={4}>
                        <CFormLabel htmlFor="inputPassword4">Data</CFormLabel>
                        <CustomDatePicker value={schedule} onChange={(value) => {setSchedule(value)}}></CustomDatePicker>
                    </CCol>
                    <CCol md={2} className="form-check form-switch form-switch-lg" style={{paddingLeft:'50px', paddingTop:'36px'}}>
                        <CFormLabel htmlFor="inputEmail4">Privado</CFormLabel>
                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefaultLg" onChangeCapture={event => setPrivateMatch(event?.currentTarget.checked)} value={privateMatch}/>
                    </CCol>
                    <CCol xs={3}>
                        <CFormLabel htmlFor="inputAddress">Quantidade de Participantes</CFormLabel>
                        <CFormInput
                            type="number"
                            placeholder="Quantidade de Participantes"
                            onChange={(event) => {setAmountVacancies(event.target?.value)}}
                        />
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="inputState">Esporte</CFormLabel>
                        <CFormSelect id="inputGroupSelect01" onChange={(event) => {setSport(event.target?.value)}} value={sport} >
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
                    <CCol md={6}>
                        <CFormLabel htmlFor="inputEmail4">Link WhatsApp</CFormLabel>
                        <CFormInput placeholder="Link WhatsApp" autoComplete="whatsappGroupLink" type="text" onChange={(event) => {setWhatsappGroupLink(event.target?.value)}} value={whatsappGroupLink} />
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Salvar</CButton>
                    </CCol>
                </CForm>
            </CCardBody>
            <Alert showAlert={showAlert} alertType={alertType} alertMessage={alertMessage} setShowAlert={setShowAlert}></Alert>
        </div>
    )
}

export default AddEvent