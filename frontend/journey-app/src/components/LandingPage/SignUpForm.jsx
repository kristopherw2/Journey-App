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
import "./SignUpForm.css";
import axios from "axios";

function SignUpForm() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [redirect, setRedirect] = useState(false);

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };  

  //Signs user up....still needs error handling
  const onSignupClick = async () => {
    const user = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);      
      
      const res = await axios.post(
        `http://${import.meta.env.VITE_BASE_URL}/api/accounts/signup_api/`,
        body,
        config
      );
      setRedirect(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to="/signin" replace={true} />;
  }

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

// // SignupPage.js  chads stuff
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// const SignupPage = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: ''
//   })
//   const { username, password } = formData

//   const onChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const onSubmit = async e => {
//     e.preventDefault()
//     const newUser = {
//       username,
//       password
//     }

//     try {
//       const config = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUser)
//       }
//       const res = await fetch('http://127.0.0.1:8000/accounts/signup/', config)
//       const data = await res.json()
//       console.log(data)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   return (
//     <div>
//       <h1>Signup</h1>
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
//         <input type="submit" value="Signup" />
//       </form>

//       <Link to="/">Go Back</Link>
//     </div>
//   )
// }

// export default SignupPage

// // SignUpForm.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import {
//   Container,
//   Button,
//   Row,
//   Col,
//   Form,
//   FormControl,
// } from "react-bootstrap";

// function SignUpForm() {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const onChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const onSignupClick = async () => {
//     const user = {
//       username: userData.username,
//       email: userData.email,
//       password: userData.password,
//     };

//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const body = JSON.stringify(user);
//       const res = await axios.post("http://127.0.0.1:8000/accounts/signup/", body, config);
//       console.log(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col md="4">
//           <center>
//             <h1>Sign up</h1>
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

//             <Form.Group controlId="emailId">
//               <Form.Label>E-mail</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 placeholder="Enter your e-mail"
//                 value={userData.email}
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
//             <Button color="primary" onClick={onSignupClick}>
//               Sign up
//             </Button>
//             <p className="mt-2">
//               Already have an account? <Link to="/signin">Sign in</Link>
//             </p>
//           </center>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default SignUpForm;
