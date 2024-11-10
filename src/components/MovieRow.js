import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";

// 스타일 정의
const MovieRowContainer = styled.div`
  padding: 20px;
  margin: 0 50px; /* 좌우 여백 추가 */
  position: relative; /* 버튼 위치를 위한 상대적 위치 */
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const MovieThumbnails = styled.div`
  display: flex;
  gap: 15px;
  overflow: hidden; /* 스크롤 영역 숨기기 */
  padding: 10px 0;
  height: 250px;
  position: relative;
`;

const MovieThumbnailWrapper = styled.div`
  position: relative;
`;

const MovieThumbnail = styled.img`
  width: 150px;
  border-radius: 5px;
  transition: transform 0.3s ease; /* 부드러운 확대 효과 추가 */

  &:hover {
    transform: scale(1.1); /* 마우스 올렸을 때 확대 */
  }
`;

const LikeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${(props) =>
    props.isLiked ? "rgba(255, 255, 0, 1)" : "rgba(255, 255, 255, 0.8)"};
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &.left {
    left: -10px; /* 왼쪽 버튼 위치 */
  }

  &.right {
    right: -10px; /* 오른쪽 버튼 위치 */
  }
`;

function MovieRow({ title, fetchUrl, userPassword, params = {} }) {
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const rowRef = useRef(null);

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

    const fetchLikedMovies = () => {
      const storedMovies =
        JSON.parse(localStorage.getItem("likedMovies")) || [];
      setLikedMovies(storedMovies);
    };

    fetchMovies();
    fetchLikedMovies();
  }, [fetchUrl, userPassword, params]);

  const handleLike = (movie) => {
    const isAlreadyLiked = likedMovies.some((m) => m.id === movie.id);

    if (!isAlreadyLiked) {
      const updatedMovies = [...likedMovies, movie];
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setLikedMovies(updatedMovies);
      alert(`${movie.title}이(가) 저장되었습니다!`);
    } else {
      const updatedMovies = likedMovies.filter((m) => m.id !== movie.id);
      localStorage.setItem("likedMovies", JSON.stringify(updatedMovies));
      setLikedMovies(updatedMovies);
      alert(`${movie.title}이(가) 저장 목록에서 제거되었습니다.`);
    }
  };

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
        {movies.map((movie) => {
          const isLiked = likedMovies.some((m) => m.id === movie.id);
          return (
            <MovieThumbnailWrapper key={movie.id}>
              <MovieThumbnail
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <LikeButton isLiked={isLiked} onClick={() => handleLike(movie)}>
                ❤
              </LikeButton>
            </MovieThumbnailWrapper>
          );
        })}
      </MovieThumbnails>
      <ScrollButton className="right" onClick={() => handleScroll("right")}>
        &gt;
      </ScrollButton>
    </MovieRowContainer>
  );
}

export default MovieRow;
