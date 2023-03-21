import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

function SignIn() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //when user clicks login it sends a post request then redirects to the dashboard...This will need error handling later.
  const onLoginClick = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(userData);
      const res = await axios.post(
        "http://127.0.0.1:8000/accounts/signin/",
        body,
        config
      );
      localStorage.setItem("token", res.data.token);
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" replace={true} />;
  }

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

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Signout from './Signout';
// import '../styles/Footer.css'

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="footer-container">
//       <div className="footer">
//         <Link to="/" className="animated-button-link left">Home Page</Link>
//         <Link to="/disclaimers" className="animated-button-link">Disclaimers</Link>
//         <Signout className="signout" onSignout={() => navigate('/login')} />
//       </div>
//     </div>
//   );
// };

// export default Footer;

// import React, { useState } from 'react'
// import axios from 'axios'
// import { Link, Navigate } from 'react-router-dom'

// const SigninPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   })
//   const { username, password } = formData
//   const [redirect, setRedirect] = useState(false)

//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const onSubmit = async e => {
//     e.preventDefault()
//     const user = {
//       username,
//       password
//     }

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//       const body = JSON.stringify(user)
//       const res = await axios.post('http://127.0.0.1:8000/accounts/signin/', body, config)
//       localStorage.setItem('token', res.data.token)
//       setRedirect(true)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   if (redirect) {
//     return <Navigate to="/letterslist" replace={true} />
//   }

//   return (
//     <div>
//       <h1>Get Your Arcade Tokens Here</h1>
//       <form onSubmit={e => onSubmit(e)}>
//         <input
//           type="text"
//           placeholder="Username"
//           name="username"
//           value={username}
//           onChange={e => onChange(e)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={password}
//           onChange={e => onChange(e)}
//         />
//         <input type="submit" value="SignIn" />
//       </form>
//       <br></br>
//       <Link to="/">Not Ready For Your Adventure?  Go Back Home Here.</Link>
//     </div>
//   )
// }

// export default SigninPage

// // SignIn.js

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Container,
//   Button,
//   Row,
//   Col,
//   Form,
//   FormControl,
// } from "react-bootstrap";
// import axios from 'axios';

// function SignIn() {
//   const [userData, setUserData] = useState({
//     username: "",
//     password: "",
//   });

//   const onChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const onLoginClick = async () => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       };
//       const body = JSON.stringify(userData);
//       const res = await axios.post('http://127.0.0.1:8000/accounts/signin/', body, config);
//       localStorage.setItem('token', res.data.token);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err)
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md="4">
//           <center>
//             <h1>Sign-in</h1>
//           </center>
//           <Form>
//             <Form.Group controlId="usernameId">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="username"
//                 placeholder="Enter username"
//                 value={userData.username}
//                 onChange={onChange}
//               />
//               <FormControl.Feedback type="invalid"></FormControl.Feedback>
//             </Form.Group>

//             <Form.Group controlId="passwordId">
//               <Form.Label>Your password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 value={userData.password}
//                 onChange={onChange}
//               />
//               <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//             </Form.Group>
//           </Form>
//           <center>
//             <Button color="primary" onClick={onLoginClick}>
//               Login
//             </Button>
//             <p className="mt-2">
//               Don't have account? <Link to="/signup">Signup</Link>
//             </p>
//           </center>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default SignIn;
