import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const BtnSearshParticipant = ({onClick}) => {
    return (
        <div class="btn-searsh-participant-container">
            <button type="button" class="btn btn-info btn-circle btn-xl" onClick={event => onClick()} data-coreui-toggle="tooltip" data-coreui-placement="bottom" title="Convidar Participante"><CIcon icon={cilSearch} size="lg" /></button>
        </div>
    )
}

export default React.memo(BtnSearshParticipant)