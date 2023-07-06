import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

import { MovieCard } from "../movie-card/movie-card";



export const ProfileView = ({ user, token, setUser, movies, onLogout }) => {
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.BirthDate);
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

    const handleDeleteUser = () => {
        fetch(`https://ortega-myflix.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            if (response.ok) {
                onLogout();
            } else {
                alert("something went wrong.");
            }
        });
    };

    return (
        <>
            <h1>Profile</h1>
            <Row>
                <Col>
                    <div>Username: {user.Username}</div>
                    <div>Email: {user.Email}</div>
                </Col>
            </Row>
            <p></p>
            <Row>
                <h3>Update your profile information here.</h3>
                <p></p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            minLength="5"
                        />
                    </Form.Group>
                    <p></p>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
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
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <p></p>
                    <Button variant="primary" type="submit">
                        Save changes
                    </Button>
                </Form>
            </Row>
            <Row>
                <p></p>
                <h3>Favorite movies:</h3>
                {favoriteMovies.map(movie => (
                    <Col className="mb-5" key={movie.id} md={4}>
                        <MovieCard movie={movie}></MovieCard>
                    </Col>
                ))}
            </Row>
        </>
    );
};