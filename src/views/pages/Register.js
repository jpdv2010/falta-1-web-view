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
import { cilLockLocked, cilUser, cilPhone } from '@coreui/icons'
import UserService from '../../utils/service/UserService'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
      role: 'USER',
      enabled: true,
      name: name,
      phone: phone
  };

  UserService.registerUser(data)
      .then(res => {
        navigate('/login');
      }).catch(function (error) {
          console.log(error);
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={(event => handleSubmit(event))}>
                  <h1>Registrar-se</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Usuário" autoComplete="username" value={username} onChange={(event) => {setUsername(event.target?.value)}}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nome" autoComplete="name" value={name} onChange={(event) => {setName(event.target?.value)}}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput type="phone" placeholder="Telefone" autoComplete="phone" value={phone} onChange={(event) => {setPhone(event.target?.value)}}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Senha"
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => {setPassword(event.target?.value)}}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repetir senha"
                      autoComplete="new-password"
                      value={password2}
                      onChange={(event) => {setPassword2(event.target?.value)}}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">Cadastrar Usuário</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register