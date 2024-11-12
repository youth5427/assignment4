import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import LikeButton from "./LikeButton";

const MovieRowContainer = styled.div`
  padding: 20px;
  margin: 0 50px;
  position: relative;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const MovieThumbnails = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto; /* 좌우 스크롤 활성화 */
  overflow-y: hidden; /* 상하 스크롤 비활성화 */
  padding: 10px 0;
  height: 250px;
  -webkit-overflow-scrolling: touch; /* 모바일 터치 스크롤 부드럽게 */

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox용 */
  -ms-overflow-style: none; /* IE, Edge용 */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge, Opera용 */
  }
`;

const MovieThumbnailWrapper = styled.div`
  position: relative;
`;

const MovieThumbnail = styled.img`
  width: 150px;
  border-radius: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 20px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &.left {
    left: -10px;
  }

  &.right {
    right: -10px;
  }
`;

function MovieRow({
  title,
  fetchUrl,
  userPassword,
  params = {},
  movies: propMovies,
}) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!fetchUrl) {
        setMovies(propMovies || []);
        return;
      }

      try {
        const response = await axios.get(fetchUrl, {
          params: { api_key: userPassword, language: "ko-KR", ...params },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies for ${title}:`, error);
      }
    };

    fetchMovies();
  }, [fetchUrl, userPassword, params, propMovies]);

  // 마우스 휠 이벤트 핸들러
  const handleWheel = (event) => {
    if (rowRef.current) {
      event.preventDefault();
      rowRef.current.scrollBy({
        left: event.deltaY, // 마우스 휠의 Y축 움직임을 가로 스크롤로 전환
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentRow = rowRef.current;
    if (currentRow) {
      currentRow.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRow) {
        currentRow.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <MovieRowContainer>
      <Title>{title}</Title>
      <ScrollButton className="left" onClick={() => handleScroll("left")}>
        &lt;
      </ScrollButton>
      <MovieThumbnails ref={rowRef}>
        {movies.map((movie) => (
          <MovieThumbnailWrapper key={movie.id}>
            <MovieThumbnail
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <LikeButton
              movie={movie}
              style={{ position: "absolute", top: "10px", right: "10px" }}
              size="30px"
              fontSize="1rem"
            />
          </MovieThumbnailWrapper>
        ))}
      </MovieThumbnails>
      <ScrollButton className="right" onClick={() => handleScroll("right")}>
        &gt;
      </ScrollButton>
    </MovieRowContainer>
  );
}

export default MovieRow;
