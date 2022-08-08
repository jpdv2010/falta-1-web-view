import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { Link } from 'react-router-dom';

const BtnAddEvent = () => {
    return (
        <div class="btn-add-event-container">
            <Link class="btn btn-info btn-circle btn-xl" to="/new-event"><CIcon icon={cilPlus} size="lg" /></Link>
            {/* <button type="button" class="btn btn-info btn-circle btn-xl" onClick={openCreateEvent}><CIcon icon={cilPlus} size="lg" /></button> */}
        </div>
    )
}

export default React.memo(BtnAddEvent)