import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
            <Row className="justify-content-md-center">
                {user === null ? (
                    <Col md={5}>
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                            }}
                        />
                        or
                        <SignupView />
                    </Col>
                ) : selectedMovie ? (
                    <Col md={8}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />
                    </Col>
                ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                ) : (
                    <>
                        {movies.map(movie => (
                            <Col className="mb-4" key={book.id} md={4}>
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onMovieClick={newSelectedMovie => {
                                        setSelectedMovie(newSelectedMovie);
                                    }}
                                />
                            </Col>
                        ))}
                        <Button
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </Button>
                    </>
                )}
            </Row>
        );
};
