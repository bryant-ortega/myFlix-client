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
            genre: "Action",
            description:
                "The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far Batman will go to save the city from chaos.",
        },
        {
            id: 2,
            title: "Snatch",
            image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Snatch_ver4.jpg",
            director: "Guy Richie",
            genre: "Heist",
            description:
                "The story follows a group of gangsters, thieves, petty criminals, and smugglers who cross paths in the pursuit of a stolen diamond.",
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
            genre: "Crime Drama",
            description:
                "The First installment in The Godfather trilogy, chronicling the Corleone family under patriarch Vito Corleone (Brando) from 1945 to 1955. It focuses on the transformation of his youngest son, Michael Corleone (Pacino), from reluctant family outsider to ruthless mafia boss.",
        },
        {
            id: 5,
            title: "The Godfather II",
            image: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
            director: "Francis Ford Coppola",
            genre: "Crime Drama",
            description:
                "Part II juxtaposes two stories: that of Michael Corleone (played, as in The Godfather, by Al Pacino) in the years after he becomes head of the Corleone family business and that of his father, Vito Corleone, as a young man (portrayed by Robert De Niro).",
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
