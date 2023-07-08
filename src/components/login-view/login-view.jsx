import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = event => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
        };

        fetch("https://ortega-myflix.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch(e => {
                alert("Something went wrong");
            });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col
                    xs={{ offset: 4 }}
                    className="fw-bold fs-5 align-self-center mb-2 mt-4"
                >
                    Login:{" "}
                </Col>
            </Row>
            <Row>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        maxLength="15"
                        required
                        minLength="3"
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        minLength="7"
                    />
                </Form.Group>
            </Row>
            <Row>
                <Col xs={{ offset: 4 }} className="mt-2">
                    <Button
                        variant="primary"
                        type="submit"
                        className="align-self-center"
                    >
                        Submit
                    </Button>
                </Col>
                <Col xs={3}>
                    <Link to={`/signup`}>I don't have and account.</Link>
                </Col>
                <Col xs={{ offset: 2 }}></Col>
            </Row>
            <Row></Row>
        </Form>
    );
};
