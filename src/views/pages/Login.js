import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
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
import { useNavigate } from 'react-router-dom';
import { getUserByUsername, login } from '../../utils/service/UserService'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        let data = {
            username: username,
            password: password
        };

        //TODO: remover linha 35 quando o acesso a api estiver funcionando
        //navigate('/dashboard');
        
        let response = login(data);

        if(response) {
            response.then(res => {
                localStorage.setItem('access-token', res.data.token);
                let responseUser = getUserByUsername(username);
                if(responseUser) {
                    responseUser.then(userRes => {
                        localStorage.setItem('user-name', userRes.data.username);
                        navigate('/dashboard');
                    })
                }
            }).catch(function (error) {
                if(error.response.status == 401) {
                    alert("Usuário ou senha incorretos!", 'danger')
                }
                console.log(error);
            });
        }   
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
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={5}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={(event) => handleSubmit(event)}>
                                        <h1>Login</h1>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Usuário" autoComplete="username" onChange={(event) => setUsername(event.target.value)} value={username} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Senha"
                                                autoComplete="current-password"
                                                onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={4}>
                                                <CButton color="primary" type="submit" className="px-4">
                                                    Entrar 
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6}>
                                                <Link to="/register">
                                                    <CButton color="info" className="px-4" tabIndex={-1}>
                                                        Cadastro
                                                    </CButton>
                                                </Link>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                                <div id="liveAlertPlaceholder"></div>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
