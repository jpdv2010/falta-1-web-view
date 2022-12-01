import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom';

const BtnAddEvent = () => {
    return (
        <div className="btn-add-event-container">
            <Link className="btn btn-info btn-circle btn-xl" to="/new-event" data-coreui-toggle="tooltip" data-coreui-placement="bottom" title="Adicionar Partida"><CIcon icon={cilPlus} size="lg" /></Link>
            {/* <button type="button" class="btn btn-info btn-circle btn-xl" onClick={openCreateEvent}><CIcon icon={cilPlus} size="lg" /></button> */}
        </div>
    )
}

export default React.memo(BtnAddEvent)