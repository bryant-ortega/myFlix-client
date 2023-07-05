import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./profile-view.scss";
import UserInfo from "./user-info";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";

import { MovieCard } from "../movie-card/movie-card";



export const ProfileView = ({ storedUser, favoriteMovies }) => {
    return (
        <>
            <Row>
                <Col>User:</Col>
                <Col xs={11}>{storedUser.Username}</Col>
            </Row>
            <Row>
                <Col>Email:</Col>
                <Col xs={11}>{storedUser.Email}</Col>
            </Row>
            <Row>
                <Col>Birthday:</Col>
                <Col xs={11}>{storedUser.Birthday}</Col>
            </Row>
            <Row>
                <Col>Favorite Movies:</Col>
            </Row>
            <Row>
                {favoriteMovies.map(movie => (
                    <Col>
                        <MovieCard movieData={movie} />
                    </Col>
                ))}
            </Row>
        </>
    );
}