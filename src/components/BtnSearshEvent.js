import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import { Link } from 'react-router-dom';

const BtnSearshEvent = () => {
    return (
        <div className="btn-add-event-container">
            <Link className="btn btn-info btn-circle btn-xl" to="/searsh-event/0"  data-coreui-toggle="tooltip" data-coreui-placement="bottom" title="Procurar Partida"><CIcon icon={cilSearch} size="lg" /></Link>
            {/* <button type="button" class="btn btn-info btn-circle btn-xl" onClick={openCreateEvent}><CIcon icon={cilPlus} size="lg" /></button> */}
        </div>
    )
}

export default React.memo(BtnSearshEvent)