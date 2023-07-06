import React from "react"   
import { Link } from "react-router-dom";

function FavoriteMovies({ favoriteMovieList }) {
    return (
        <Row>
            <Col xs={2}>
                <h2>Favorite Movies</h2>
            </Col>
            {favoriteMovieList.map(movies => {
                return (
                    <div key={movies.id}>
                        <img src={movies.ImagePath} />
                        <Link to={`/movies/${movies._id}`}>
                            <h4>{movies.Title}</h4>
                        </Link>
                        <button
                            variant="secondary"
                            onClick={() => removeFav(movies.id)}
                        >
                            Remove from list
                        </button>
                    </div>
                );
            })}
        </Row>
    );
}

export default FavoriteMovies