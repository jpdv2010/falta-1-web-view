import React, { useState } from 'react'

const Alert = ({alertType, alertMessage, showAlert, setShowAlert}) => {
    return (<>
        {showAlert ?
            <div class={"alert alert-" + alertType + " alert-dismissible"} style={{ position: 'absolute', bottom: '0px' }} role="alert">
                <div>{alertMessage}</div>
                <button type="button" class="btn-close" data-coreui-dismiss="alert" aria-label="Close" onClick={event => setShowAlert(false)}></button>
            </div> : <></>
        }
    </>)
}

export default Alert