import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { Link } from 'react-router-dom';

const BtnSearshEvent = () => {
    return (
        <div class="btn-add-event-container">
            <Link class="btn btn-info btn-circle btn-xl" to="/searsh-event/0"><CIcon icon={cilSearch} size="lg" /></Link>
            {/* <button type="button" class="btn btn-info btn-circle btn-xl" onClick={openCreateEvent}><CIcon icon={cilPlus} size="lg" /></button> */}
        </div>
    )
}

export default React.memo(BtnSearshEvent)