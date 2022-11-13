import { CRow, CCol, CCard, CCardBody, CCardTitle, CCardText, CButton } from "@coreui/react"
import _events from '../../_events';

const SearshEvent = () => {
    const getEvents = () => {
        return _events;
    }

    const getVagasRestantes = (item) => {
        let size = item.amountVacancies - item.participants.length;
        return size;
    }

    return (
        <CRow>
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
    )
}

export default SearshEvent