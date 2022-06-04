import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const BtnAddEvent = () => {
    return (
        <div class="btn-add-event-container">
            <button type="button" class="btn btn-info btn-circle btn-xl"><CIcon icon={cilPlus} size="lg" /></button>
        </div>
    )
}

export default React.memo(BtnAddEvent)