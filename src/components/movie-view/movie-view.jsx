import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);


    useEffect(() => {
        const isFavorited = user.FavoriteMovies.includes(movieId);
        setIsFavorite(isFavorited);
    }, []);

    const removeFavorite = () => {
        fetch(
            `https://ortega-myflix.herokuapp.com/users/${user.Username}/${movieId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setIsFavorite(false);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            });
    };

    const addToFavorite = () => {
        fetch(
            `https://ortega-myflix.herokuapp.com/users/${user.Username}/${movieId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                setIsFavorite(true);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
            });
    };

const movie = movies.find(m => m.id === movieId);

    return (
        <div>
            <div>
              <p></p>
                <img src={movie.image} />
            </div>
            <p></p>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <p></p>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <p></p>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <p></p>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <p></p>
            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addToFavorite}>Add to favorites</Button>
            )}
            <p></p>
            <Link to={"/"}>
                <Button>Back</Button>
            </Link>
            <p></p>
        </div>
    );
};
