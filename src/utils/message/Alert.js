import Modal from 'react-bootstrap/Modal';

const Alert = ({ title, message, showClose, showCancel, closeText, cancelText }) => {
    const [show, setShow] = React.useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (<>
        <Modal aria-labelledby="example-custom-modal-styling-title" dialogClassName="modal-50g" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                {showClose ? <button type="button" class="btn btn-secondary" data-coreui-dismiss="modal">{closeText ? closeText : 'Fechar'}</button> : <></>}
                {showCancel ? <button type="button" class="btn btn-primary">{cancelText ? cancelText : 'Cancelar'}</button> : <></>}
            </Modal.Footer>
        </Modal>
    </>)
}
export default Alert