import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// 스타일 정의
const MovieRowContainer = styled.div`
  padding: 20px;
  margin: 0 50px; /* 좌우 여백 추가 */
`;

const MovieThumbnails = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
`;

const MovieThumbnail = styled.img`
  width: 150px;
  border-radius: 5px;
`;

function MovieRow({ title, fetchUrl, userPassword, params = {} }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchUrl, {
          params: {
            api_key: userPassword,
            language: "ko-KR",
            ...params,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies for ${title}:`, error);
      }
    };

    fetchMovies();
  }, [fetchUrl, userPassword, params]);

  return (
    <MovieRowContainer>
      <h2>{title}</h2>
      <MovieThumbnails>
        {movies.map((movie) => (
          <MovieThumbnail
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ))}
      </MovieThumbnails>
    </MovieRowContainer>
  );
}

export default MovieRow;
