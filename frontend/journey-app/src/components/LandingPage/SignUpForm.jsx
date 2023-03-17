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
import "./SignUpForm.css";

function SignUpForm() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSignupClick = () => {
    console.log(
      "Sign up user=" +
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
            <h1>Sign up</h1>
          </center>
          <Form>
            <Form.Group controlId="usernameId">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter a Username"
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
            <Button color="primary" onClick={onSignupClick}>
              Sign up
            </Button>
            <p className="mt-2">
              Already have account? <Link to="/signin">Login</Link>
            </p>
          </center>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpForm;
