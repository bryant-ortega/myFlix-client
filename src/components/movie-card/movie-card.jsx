import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Genre: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Director: PropTypes.string.isRequired,
        actors: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
};
