import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom';

const BtnDeleteParticipant = ({onClick}) => {
    return (
        <div class="btn-searsh-participant-container">
            <button type="button" class="btn btn-danger btn-circle btn-xl" onClick={event => onClick()}  data-coreui-toggle="tooltip" data-coreui-placement="bottom" title="Remover Participante"><CIcon icon={cilTrash} size="lg" /></button>
        </div>
    )
}

export default React.memo(BtnDeleteParticipant)