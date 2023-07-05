import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    // const [selectedMovie, setSelectedMovie] = useState(null);

useEffect(() => {
    if (!token) {
        return;
    }

    fetch("https://ortega-myflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then(response => response.json())
        .then(movies => {
            const moviesFromApi = movies.map(movie => {
                return {
                    id: movie._id,
                    title: movie.Title,
                    image: movie.ImagePath,
                    genre: movie.Genre.Name,
                    director: movie.Director.Name,
                    description: movie.Description,
                };
            });

            setMovies(moviesFromApi);
        });
}, [token]);

        return (
            <BrowserRouter>
                <Row>
                    <Col>
                        <NavigationBar
                            user={user}
                            token={token}
                            onLoggedOut={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView
                                                onLoggedIn={(user, token) => {
                                                    setUser(user);
                                                    setToken(token);
                                                }}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />

                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />

                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col
                                            md={8}
                                            style={{
                                                border: "1px solid black",
                                            }}
                                        >
                                            <MovieView
                                                style={{
                                                    border: "1px solid red",
                                                }}
                                                movies={movies}
                                            />
                                        </Col>
                                    )}
                                </>
                            }
                        />

                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <>
                                            {movies.map(movie => (
                                                <Col
                                                    className="mb-4"
                                                    key={movie.id}
                                                    md={4}
                                                >
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>

                    {user && (
                        <Col md={1}>
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    setUser(null);
                                    setToken(null);
                                    localStorage.clear();
                                }}
                            >
                                Logout
                            </Button>
                        </Col>
                    )}
                </Row>
            </BrowserRouter>
        );
};
