import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import testMap from "../../assets/map.jpeg";
import Map from "../PostInteraction/Map"



function MapModal(props) {
  return (
    <>
      <Modal show={props.showMap} onHide={props.handleCloseMap}>
        <Modal.Header closeButton>
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>MAP</h2>
          {/* <img src={testMap} /> */}
          {/* <Map lat={"18.340"} lng={"-64.75"} /> */}
          <Map lat={props.lat} lng={props.long} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseMap}>
            Close
          </Button>
          <Button variant="primary" post_id={props.itemToUpdate ? props.itemToUpdate.id : null} onClick={props.handleCloseMap}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )

}

export default MapModal
