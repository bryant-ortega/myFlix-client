import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = event => {
      event.preventDefault();

      const data = {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
      };

      fetch("https://ortega-myflix.herokuapp.com/users", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      }).then(response => {
          if (response.ok) {
              alert("Signup successful");
              window.location.reload();
          } else {
              alert("Signup failed");
          }
          }).catch((error) => {
            alert("Something went wrong" +error)
      });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
                <Col xs={{ offset: 4 }} className="fs-5 fw-bold">
                    or Register:
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="signUpFormUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="signUpFormPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="signUpFormEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group controlId="signUpFormBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={e => setBirthday(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
                <Col xs={{ offset: 4 }} className="mt-2">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Col>
                <Col xs={3}>
                    <Link to={`/login`}>I already have an account.</Link>
                </Col>
                <Col></Col>
            </Row>
        </Form>
    );
};
