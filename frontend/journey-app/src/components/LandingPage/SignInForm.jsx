import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Button, Row, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

function SignIn({ onLogin }) {
  const [redirect, setRedirect] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const onLoginClick = async (values) => {
    const user = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(user);
      const res = await axios.post(
        `http://${import.meta.env.VITE_BASE_URL}/api/accounts/signin_api/`,
        body,
        config
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("id", res.data.user_id);
      if (onLogin) onLogin(true);
      setRedirect(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to login");
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" replace={true} />;
  }
  return (
    <div
      div
      style={{
        backgroundImage: "url(./landingbackground.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
      }}
    >
      <img
        src="landinglogo.png"
        alt="Image"
        style={{
          width: "50vw",
          maxWidth: "500px",
          position: "fixed",
          top: 0,
          marginTop: "50px",
        }}
      />
      <Container style={{ backgroundColor: "transparent" }}>
        <Row>
          <center>
            <h1 style={{ color: "white" }}>Sign-in</h1>
          </center>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={onLoginClick}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  controlId="usernameId"
                  style={{
                    margin: "0 auto",
                    width: "60%",
                    textAlign: "center",
                  }}
                >
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group
                  controlId="emailId"
                  style={{
                    margin: "0 auto",
                    width: "60%",
                    textAlign: "center",
                  }}
                >
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    E-mail
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your e-mail"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Form.Group
                  controlId="passwordId"
                  style={{
                    margin: "0 auto",
                    width: "60%",
                    textAlign: "center",
                  }}
                >
                  <Form.Label style={{ color: "white", fontWeight: "bold" }}>
                    Your password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign in"}
                </Button>
                {submitError && (
                  <div className="mt-2 text-danger">{submitError}</div>
                )}
              </Form>
            )}
          </Formik>
          <center>
            <p className="mt-2" style={{ color: "white", fontWeight: "bold" }}>
              Don't have an account? <Link to="/signup" style={{ color: "skyblue", fontWeight: "bold" }}>Sign up</Link>
            </p>
          </center>
        </Row>
        {redirect && <Navigate to="/dashboard" replace={true} />}
      </Container>
    </div>
  );
}
export default SignIn;
//old code pre error handling below
// import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import {
//   Container,
//   Button,
//   Row,
//   Col,
//   Form,
//   FormControl,
// } from "react-bootstrap";
// import axios from "axios";

// function SignIn({ onLogin }) {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [redirect, setRedirect] = useState(false);

//   const onChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   //when user clicks login it sends a post request then redirects to the dashboard...This will need error handling later.
//   const onLoginClick = async () => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       console.log(`LOGIN URL: ${import.meta.env.VITE_BASE_URL}`)
//       const body = JSON.stringify(userData);
//       const res = await axios.post(
//         `http://${import.meta.env.VITE_BASE_URL}/api/accounts/signin_api/`,
//         body,
//         config
//       );
//       console.log(res);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("id", res.data.user_id);
//       if (onLogin) onLogin(true);
//       setRedirect(true);

//       console.log("Cookies after login:", document.cookie);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/dashboard" replace={true} />;
//   }

//   return (
//     <Container>
//       <Row>
//         {/* <Col md="4"> */}
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

//             <Form.Group controlId="emailId">
//               <Form.Label>E-mail</Form.Label>
//               <Form.Control
//                 type="text"
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
//             <Button color="primary" onClick={onLoginClick}>
//               Login
//             </Button>
//             <p className="mt-2">
//               Don't have account? <Link to="/signup">Signup</Link>
//             </p>
//           </center>
//         {/* </Col> */}
//       </Row>
//     </Container>
//   );
// }

// export default SignIn;
