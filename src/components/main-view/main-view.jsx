import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Dark Knight",
            image: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
            director: "Christopher Nolan",
        },
        {
            id: 2,
            title: "Snatch",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Snatch_ver4.jpg",
            director: "Guy Richie",
        },
        {
            id: 3,
            title: "Goodfellas",
            image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
            director: "Martin Scorsese",
        },
        {
            id: 4,
            title: "The Godfather",
            image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
            director: "Francis Ford Coppola",
        },
        {
            id: 5,
            title: "The Godfather II",
            image: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
            director: "Francis Ford Coppola",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onBookClick={newSelectedMovie => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
