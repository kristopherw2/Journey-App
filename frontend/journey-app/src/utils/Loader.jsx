import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <Spinner animation="grow" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;
