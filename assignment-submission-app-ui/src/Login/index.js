import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStrorage";
//import { ajax } from "../Services/fetchService";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
    };
    // ajax("api/auth/login", "POST", jwt, reqBody);
    fetch("api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        //"authorization" comes from backend HttpStatus.AUTHORIZE=> Authorization
        // It can be seen at the backend or Network->headers tab of the browser
        setJwt(headers.get("authorization"));
        //if logged successfully send to the dashboard page
        window.location.href = "/dashboard";
        // navigate("/dashboard");
      })
      .catch((message) => {
        alert(message);
      });
  }
  return (
    <>
      <Container className="mt-5 ">
        <Row className="justify-content-md-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-4 flex-md-row justify-content-md-between"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => sendLoginRequest()}
            >
              Login
            </Button>

            <Button
              variant="secondary"
              id="submit"
              type="button"
              size="lg"
              onClick={() => (window.location.href = "/")}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
