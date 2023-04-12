import { Button, Form } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import testMap from "../../assets/map.jpeg";
import Map from "../PostInteraction/Map"
import React from 'react';
import './MapModal.css';






function MapModal(props) {
  return (
    <>
      <Modal show={props.showMap} onHide={props.handleCloseMap} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Map</Modal.Title>
        </Modal.Header>
        <Modal.Body className="map-modal-body">
          <p>
            Latitude : {props.lat}  Longitude : {props.long}
          </p>
          <Map lat={props.lat} lng={props.long} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseMap}>
            Close
          </Button>
          {/* <Button variant="primary" post_id={props.itemToUpdate ? props.itemToUpdate.id : null} onClick={props.handleCloseMap}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default MapModal
