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
import ServiceContext from '../../utils/service/ServiceContext'

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

        navigate('/dashboard');
        
        ServiceContext.login(data)
            .then(res => {
                localStorage.setItem('access-token', res.data.access_token);
                navigate('/dashboard');
            }).catch(function (error) {
                console.log(error);
            });
        
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
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
                                            <CCol xs={2}>
                                                <CButton color="primary" type="submit" className="px-4">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6}>
                                                <Link to="/register">
                                                    <CButton color="info" className="px-4" tabIndex={-1}>
                                                        Registre-se!
                                                    </CButton>
                                                </Link>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
