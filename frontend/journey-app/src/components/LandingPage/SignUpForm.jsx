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
import * as Yup from "yup";
import { Formik } from "formik";

function SignUpForm() {
  const [redirect, setRedirect] = useState(false);
  const [submitError, setSubmitError] = useState("");

  //Signs user up....still needs error handling
  const onSignupClick = async (values) => {
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
        `http://${import.meta.env.VITE_BASE_URL}/api/accounts/signup_api/`,
        body,
        config
      );
      setRedirect(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Failed to sign up");
    }
  };

  if (redirect) {
    return <Navigate to="/signin" replace={true} />;
  }

  return (
    <div
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
          width: "60vw",
          maxWidth: "600px",
          position: "fixed",
          top: 0,
          marginTop: "50px",
        }}
      />
      <Container style={{ backgroundColor: "transparent" }}>
        <Row>
          <center>
            <h1 style={{ color: "white" }}>Create Your Account</h1>
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
              password: Yup.string()
                .matches(
                  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  "Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number"
                )
                .required("Password is required"),
            })}
            onSubmit={onSignupClick}
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
                    placeholder="Enter a Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Button type="submit" color="sky-blue" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Sign up"}
                </Button>
                {submitError && (
                  <div className="mt-2 text-danger">{submitError}</div>
                )}
              </Form>
            )}
          </Formik>

          <center>
            <p className="mt-2" style={{ color: "white" }}>
              Already have an account?{" "}
              <Link to="/signin" style={{ color: "skyblue" }}>
                Login
              </Link>
            </p>
          </center>
        </Row>
        {redirect && <Navigate to="/signin" replace={true} />}
      </Container>
    </div>
  );
}

export default SignUpForm;

// Kris intial code below and chads new code above that has error validation for name, email, and password

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
// import "./SignUpForm.css";
// import axios from "axios";

// function SignUpForm() {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [redirect, setRedirect] = useState(false);

//   const onChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   //Signs user up....still needs error handling
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

//       const res = await axios.post(
//         `http://${import.meta.env.VITE_BASE_URL}/api/accounts/signup_api/`,
//         body,
//         config
//       );
//       setRedirect(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (redirect) {
//     return <Navigate to="/signin" replace={true} />;
//   }

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
//                 placeholder="Enter a Username"
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
//             <Button color="primary" onClick={onSignupClick}>
//               Sign up
//             </Button>
//             <p className="mt-2">
//               Already have account? <Link to="/signin">Login</Link>
//             </p>
//           </center>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default SignUpForm;
