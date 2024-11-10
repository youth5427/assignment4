import React, { useEffect, useState } from "react";
import "./MovieRow.css";

function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [fetchUrl]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-thumbnails">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="movie-thumbnail"
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
