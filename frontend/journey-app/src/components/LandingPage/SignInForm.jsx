import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";

function SignIn() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onLoginClick = () => {
    console.log(
      "Log in user=" +
        userData.username +
        " email=" +
        userData.email +
        " password=" +
        userData.password
    );
  };

  return (
    <Container>
      <Row>
        <Col md="4">
          <center>
            <h1>Sign-in</h1>
          </center>
          <Form>
            <Form.Group controlId="usernameId">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={userData.username}
                onChange={onChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="emailId">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter your e-mail"
                value={userData.email}
                onChange={onChange}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="passwordId">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Form>
          <center>
            <Button color="primary" onClick={onLoginClick}>
              Login
            </Button>
            <p className="mt-2">
              Don't have account? <Link to="/signup">Signup</Link>
            </p>
          </center>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
