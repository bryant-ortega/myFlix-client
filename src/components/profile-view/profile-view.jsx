import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./profile-view.scss";
import Container from "react-bootstrap/Container";
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

    console.log(favoriteMovies);

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
        <Container>
            <Row>
              <p></p>
                <Col xs={12} sm={4}>
                    <Card>
                        <Card.Body>
                            <UserInfo name={user.Username} email={user.Email} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* <UpdateUser handleSubmit={ handleSubmit } handleUpdate={ handleUpdate } /> */}
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