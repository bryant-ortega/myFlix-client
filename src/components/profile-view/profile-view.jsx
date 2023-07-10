import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./profile-view.scss";
import Container from "react-bootstrap/Container";
import UserInfo from "./user-info";


import { MovieCard } from "../movie-card/movie-card";



export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const favoriteMovies = movies.filter((movie) => {
        return user.FavoriteMovies.includes(movie.id)
    });

    //  let favoriteMovies = movies.filter(m =>
    //      user.FavoriteMovies.includes(m._id)
    //  );


    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday,
        };

        fetch(`https://ortega-myflix.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Update failed.");
                }
            })
            .then(data => {
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            });
    };

    console.log(favoriteMovies);

    const handleDeleteUser = () => {
        fetch(`https://ortega-myflix.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    localStorage.clear();
                    alert("Account successfully deleted");
                    <Navigate to="/signup" />; // replace window reload with navigate
                } else {
                    alert("Deletion failed!");
                    window.location.reload();
                }
            })
            .catch(e => {
                alert("Something went wrong");
                window.location.reload();
                console.log(e);
            });
    };

    return (
        <Container>
            <Row>
                <p></p>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UserInfo name={user.Username} email={user.Email} birthday={user.Birthday} handleDeleteUser={handleDeleteUser}/>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <h4>Update your profile information.</h4>
                                <p></p>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Username"
                                        value={username}
                                        onChange={e =>
                                            setUsername(e.target.value)
                                        }
                                        required
                                        minLength="5"
                                    />
                                </Form.Group>
                                <p></p>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        minLength="5"
                                    />
                                </Form.Group>
                                <p></p>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <p></p>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={new Date(user.Birthday)
                                            .toISOString()
                                            .slice(0, 10)}
                                        onChange={e =>
                                            setBirthday(e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Save changes
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <p></p>
            <Row>
                <p></p>
                <h3>Favorite movies:</h3>
                {favoriteMovies.map(movie => (
                    <Col className="mb-5" key={movie.id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                ))}
            </Row>
            <Row></Row>
        </Container>
    );
};