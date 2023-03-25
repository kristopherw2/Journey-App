import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import "./UpdateForm.css";


function UpdateForm(props) {
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose} id="update-modal">
        <Modal.Header closeButton id = "modal-header">
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-update-body">
          <Form layout="vertical">
            <Form.Group className="mb-3" controlId="postTextInput">
              <Form.Control as="textarea" id = "update_desc"
              value = {props.originalDesc}
              rows={10}
              onChange={props.handleOnChange}
            />
          </Form.Group>
       </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" post_id={props.itemToUpdate? props.itemToUpdate.id: null} onClick={props.handleClickSaveUpdate}>
            Save Changes
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )

}

export default UpdateForm
