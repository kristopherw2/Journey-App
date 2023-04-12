import {Button, Form} from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import "./UpdateForm.css";


function UpdateForm(props) {
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose} id="update-modal">
        <Modal.Header>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modal-update-body">
          <Form layout="vertical">
          <Form.Group className="mb-3" controlId="postTextInput">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" id = "update_title"
              value = {props.originalTitle}
              onChange={props.handleOnChangeTitle}
              />
              {}
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" id = "update_desc"
              value = {props.originalDesc}
              rows={10}
              onChange={props.handleOnChangeDesc}
              />
              {}
              <Form.Label>Difficulty Level</Form.Label>
              <Form.Control type="text" id = "update_level"
              value = {props.originalLevel}
              onChange={props.handleOnChangeLevel}
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
